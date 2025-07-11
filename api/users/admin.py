from django.contrib import admin
from django.contrib import messages
from .models import Guide, Advisor, PermissionLevel


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    """
    Admin configuration for Guide.
    """
    list_display = ('id', 'username', 'emailAdress', 'permission')
    search_fields = ('username', 'emailAdress', 'permission')
    list_filter = ('permission',)
    actions = ['promote_to_guide', 'demote_to_trainee_guide', 'promote_to_advisor']

    @admin.action(description='Promote selected users to Guide')
    def promote_to_guide(self, request, queryset):
        """
        Promote selected trainee guides to full guides.
        """
        updated = queryset.filter(permission=PermissionLevel.TRAINEE_GUIDE.name).update(permission=PermissionLevel.GUIDE.name)
        messages.success(request, f"{updated} trainee guide(s) promoted to full guide.")

    @admin.action(description='Demote selected users to Trainee Guide')
    def demote_to_trainee_guide(self, request, queryset):
        """
        Demote selected full guides to trainee guides.
        """
        updated = queryset.filter(permission=PermissionLevel.GUIDE.name).update(permission=PermissionLevel.TRAINEE_GUIDE.name)
        messages.success(request, f"{updated} guide(s) demoted to trainee guide.")
    
    @admin.action(description='Promote selected guides to Advisor')
    def promote_to_advisor(self, request, queryset):
        """
        Promote selected guides to advisors.
        """
        for guide in queryset:
            # Extract parent user data before deleting the guide
            parent_user_id = guide.id
            parent_user_email = guide.emailAdress
            parent_user_password = guide.password
            parent_user_username = guide.username

            # Delete the Guide object first
            guide.delete()

            # Create a new Advisor object after deleting the Guide
            advisor = Advisor.objects.create(
                id=parent_user_id,  # Reuse the same User ID
                emailAdress=parent_user_email,
                password=parent_user_password,
                username=parent_user_username,
                department="General"  # Default department, can be customized
            )

        messages.success(request, f"{queryset.count()} guide(s) promoted to advisor successfully.")



@admin.register(Advisor)
class AdvisorAdmin(admin.ModelAdmin):
    """
    Admin configuration for Advisor.
    """
    list_display = ('id', 'username', 'emailAdress', 'department')
    search_fields = ('username', 'emailAdress', 'department')
    list_filter = ('department',)
    actions = ['promote_to_coordinator', 'demote_to_guide']

    @admin.action(description='Demote selected advisors to Guide')
    def demote_to_guide(self, request, queryset):
        """
        Demote selected advisors to guides.
        """
        for advisor in queryset:
            # Extract parent user data before deleting the advisor
            parent_user_id = advisor.id
            parent_user_email = advisor.emailAdress
            parent_user_password = advisor.password
            parent_user_username = advisor.username

            # Delete the Advisor object first
            advisor.delete()

            # Create a new Guide object after deleting the Advisor
            guide = Guide.objects.create(
                id=parent_user_id,  # Reuse the same User ID
                emailAdress=parent_user_email,
                password=parent_user_password,
                username=parent_user_username,
                permission=PermissionLevel.GUIDE.name  # Default to GUIDE level
            )

        messages.success(request, f"{queryset.count()} advisor(s) demoted to guide successfully.")

    



