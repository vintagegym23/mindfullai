from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    SignupSerializer,
    UserSerializer,
    ChatSessionSerializer,
    MessageSerializer,
    MentalHealthReportSerializer,
)
from .models import ChatSession, Message, MentalHealthReport
from rest_framework.decorators import api_view, permission_classes

User = get_user_model()

# Helper to create JWT tokens for a user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class ChatSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        session_id = self.kwargs.get('session_id')
        return Message.objects.filter(session__id=session_id, session__user=self.request.user)

    def perform_create(self, serializer):
        session_id = self.kwargs.get('session_id')
        try:
            session = ChatSession.objects.get(id=session_id, user=self.request.user)
        except ChatSession.DoesNotExist:
            return Response({'error': 'Chat session not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer.save(session=session, sender=self.request.user)


class MentalHealthReportListCreateView(generics.ListCreateAPIView):
    serializer_class = MentalHealthReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MentalHealthReport.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Implement your dashboard stats logic here, for example:
        stats = {
            "total_chats": ChatSession.objects.filter(user=request.user).count(),
            "total_reports": MentalHealthReport.objects.filter(user=request.user).count(),
            # Add more stats as needed
        }
        return Response(stats)


class LatestReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        latest_report = MentalHealthReport.objects.filter(user=request.user).order_by('-created_at').first()
        if not latest_report:
            return Response({'detail': 'No reports found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MentalHealthReportSerializer(latest_report)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def chat_with_gemini(request):
    message = request.data.get('message')
    if not message:
        return Response({'error': 'Message is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Implement your chat logic with Gemini AI or external service here.
    # For now, let's just echo the message:
    reply = f"Echo: {message}"

    # Optionally create or retrieve a chat session here
    # and save messages if needed

    return Response({'reply': reply})
