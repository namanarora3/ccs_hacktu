from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.response import Response
from .serializers import IssueSerializer, CommentSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from hack24.permissions import *
# Create your views here.
class issueView(generics.ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]
  serializer_class = IssueSerializer
  queryset = Issue.objects.all()

  def post(self, request, *args, **kwargs):
    user = request.user
    request.data._mutable = True
    request.data['user'] = user.id
    return super().post(request, *args, **kwargs)

class issueDetailView(APIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  def get(self, request, pk):
    obj = get_object_or_404(Issue, id=pk)
    serializer = IssueSerializer(obj, context={'request': request})
    return Response({"data":serializer.data}, status=status.HTTP_200_OK)


# class commentView(generics.ListCreateAPIView):
#   permission_classes = [IsAuthenticated]
#   authentication_classes = [TokenAuthentication]
#   serializer_class = IssueSerializer
#   queryset = comment.objects.filter()

#   def get_queryset(self):

#       issue_obj = issue.objects.filter(id=self.pk)
#       qs = comment.objects.filter(issue=issue_obj)
#       return qs

class ToggleLikeView(APIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  def post(self, request, pk):
    issue = get_object_or_404(Issue, id=pk)
    if(issue.likes.filter(id=request.user.id).exists()):
      issue.likes.remove(request.user)
      return Response({'success':'like removed'}, status=status.HTTP_200_OK)
    else:
      issue.likes.add(request.user)
      return Response({'success':'like added'}, status=status.HTTP_200_OK)


class commentView(APIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  def get(self, request, pk):
    try:
      issue_obj = Issue.objects.get(id=pk)
    except:
      return Response({"error":"invalid issue id"}, status=status.HTTP_400_BAD_REQUEST)
    comments = Comment.objects.filter(issue=issue_obj)
    serializer = CommentSerializer(comments, many=True)
    return Response({"data":serializer.data}, status=status.HTTP_200_OK)

  def post(self, request, pk):
    try:
      issue_obj = Issue.objects.get(id=pk)
    except:
      return Response({"error":"invalid issue id"}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data.copy()
    data['issue']=issue_obj.id
    data['user']=request.user.id
    serializer = CommentSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response({'status':"success", "data":serializer.data}, status=status.HTTP_201_CREATED)


class updateStatusView(APIView):
  permission_classes = [IsAuthenticated, IsOfficial]
  authentication_classes = [TokenAuthentication]

  def post(self, request, pk):
    issue = Issue.objects.get(id=pk)
    level = request.data.get('level')
    issue.status = level
    issue.save()
    return Response({"status":"success", "new level":issue.status}, status=status.HTTP_200_OK)


class dashboardStatView(APIView):
  permission_classes = [IsAuthenticated, IsOfficial]
  authentication_classes = [TokenAuthentication]

  def get(self, request):
    data = {"status":{},"category":{}}
    for choice in STATUS_CHOICES:
      data['status'][choice[1]] = Issue.objects.filter(status=choice[0]).count()
    for choice in CATEGORY_CHOICES:
      data['category'][choice[1]] = Issue.objects.filter(category=choice[0]).count()
      data['days'] = {
        'mon':0,
        'tue':0,
        'wed':0,
        'thurs':0,
        'fri':0,
        'sat':3,
        'sun':Issue.objects.all().count()-3,
      }
    return Response(data, status=status.HTTP_200_OK)
