# pyre-ignore-all-errors
from django.contrib.auth.models import User
from rest_framework import generics, permissions, serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        identifier = attrs.get('username')  # This can be username or email
        password = attrs.get('password')

        user = None
        # Try to authenticate with username
        user = self.authenticate_user(identifier, password)
        if user:
            if user.is_active:
                self.user = user
                refresh = self.get_token(user)
                return {'refresh': str(refresh), 'access': str(refresh.access_token)}
            else:
                raise serializers.ValidationError('Account is disabled')

        # If not, try as email
        try:
            user_obj = User.objects.get(email__iexact=identifier.strip())
            user = self.authenticate_user(user_obj.username, password)
            if user and user.is_active:
                self.user = user
                refresh = self.get_token(user)
                return {'refresh': str(refresh), 'access': str(refresh.access_token)}
            elif user and not user.is_active:
                raise serializers.ValidationError('Account is disabled')
            else:
                raise serializers.ValidationError('Invalid password for this email')
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials')

    def authenticate_user(self, username, password):
        from django.contrib.auth import authenticate
        return authenticate(username=username, password=password)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)


    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'confirm_password')
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}


    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})
        return attrs


    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
