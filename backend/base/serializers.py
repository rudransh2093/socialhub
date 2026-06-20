from rest_framework import serializers
from .models import MyUser, Post
class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ['username', 'email', 'name', 'password']

    def create(self, validated_data):
        user = MyUser(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class MyUserProfileSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = MyUser
        fields = ['username', 'name', 'bio', 'profile_image', 'follower_count', 'following_count']

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'username', 'description', 'formatted_date', 'likes', 'like_count', 'profile_image', 'name']

    def get_username(self, obj):
        return obj.user.username
    
    def get_like_count(self, obj):
        return obj.likes.count()

    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%d %b %y")

    def get_profile_image(self, obj):
        if obj.user.profile_image:
            return obj.user.profile_image.url
        return None

    def get_name(self, obj):
        return obj.user.name or obj.user.username
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'email', 'profile_image', 'name']