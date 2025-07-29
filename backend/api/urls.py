from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    ChatSessionListCreateView,
    MessageListCreateView,
    UserProfileView,
    MentalHealthReportListCreateView,
    DashboardStatsView,       
    LatestReportView,
    chat_with_gemini,  
)

urlpatterns = [
    path('chats/', ChatSessionListCreateView.as_view(), name='chat-list-create'),
    path('chats/<int:session_id>/messages/', MessageListCreateView.as_view(), name='message-list-create'),
    path('reports/', MentalHealthReportListCreateView.as_view(), name='report-list-create'),

    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('reports/latest/', LatestReportView.as_view(), name='latest-report'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('chat/message/', chat_with_gemini, name='chat-gemini'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)