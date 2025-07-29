from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.validators import UniqueValidator
from .models import ChatSession, Message, MentalHealthReport

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ["id", "username", "email", "created_at", "avatar"]


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Authenticate expects 'username', even if you renamed it to 'email'
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {'user': user}

class ChatSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatSession
        fields = ["id", "user", "session_id", "created_at", "updated_at"]
        read_only_fields = ["user", "created_at", "updated_at"]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "session", "sender", "content", "timestamp"]
        read_only_fields = ["session", "sender", "timestamp"]


class MentalHealthReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalHealthReport
        fields = ["id", "user", "content", "created_at", "file"]
        read_only_fields = ["user", "created_at"]
