from django.db import models
from django.contrib.auth.hashers import make_password
from enum import Enum

class Users(models.Model):
    """
    Base user model containing shared fields.
    """
    id = models.AutoField(primary_key=True)  # Ensures an auto-incrementing primary key
    username = models.TextField(null=True, unique=False)
    emailAdress = models.EmailField(unique=True)  # Unique email addresses
    password = models.TextField()  # Store hashed passwords

    def set_password(self, newPassword):
        """
        Sets the user's password after hashing.
        """
        self.password = make_password(newPassword)  # Hash the password before saving

    def __str__(self):
        return self.emailAdress

class PermissionLevel(Enum):
    GUIDE = "Guide"
    TRAINEE_GUIDE = "Trainee Guide"

class Guide(Users):
    """
    Guide inherits from Users and adds Guide-specific fields.
    """
    permission = models.CharField(
        max_length=20,
        choices=[(level.name, level.value) for level in PermissionLevel],  # Enum choices
        default=PermissionLevel.TRAINEE_GUIDE.name  # Default permission is Trainee Guide
    )
    expertise = models.CharField(max_length=100, blank=True, null=True)  # Field to store guide expertise

    def promote_to_guide(self):
        """
        Promote a trainee guide to a full guide.
        """
        if self.permission == PermissionLevel.GUIDE.name:
            raise ValueError("The guide is already at the highest permission level.")
        self.permission = PermissionLevel.GUIDE.name
        self.save()

    def demote_to_trainee(self):
        """
        Demote a guide to a trainee guide.
        """
        if self.permission == PermissionLevel.TRAINEE_GUIDE.name:
            raise ValueError("The guide is already at the trainee guide level.")
        self.permission = PermissionLevel.TRAINEE_GUIDE.name
        self.save()

    def __str__(self):
        return f"Guide: {self.emailAdress}, Permission: {self.permission}"



class Advisor(Users):
    """
    Advisor inherits from Users and adds Advisor-specific fields.
    """
    department = models.CharField(max_length=100, blank=True, null=True)  # Example field

    def __str__(self):
        return f"Advisor: {self.emailAdress}"

class Coordinator(Users):
    """
    Coordinator inherits from Users and adds specific fields.
    """
    department = models.CharField(max_length=100, blank=True, null=True)  # Department of the coordinator
    office_phone = models.CharField(max_length=15, blank=True, null=True)  # Office phone number

    def __str__(self):
        return f"Coordinator: {self.username} ({self.emailAdress})"
