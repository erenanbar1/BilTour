from django.db import models
from users.models import Guide
import uuid

class Tour(models.Model):

    POSSIBLE_TIMES = [
        ('1', '09.00'),
        ('2', '11.00'),
        ('3', '13.00'),
        ('4', '15.00')
    ]

    """
    Represents a tour scheduled with schools.
    """
    tourId = models.AutoField(primary_key=True)  # Ensures an auto-incrementing primary key
    schoolName = models.TextField(blank=True, null=True)  # Name of the school
    schoolCity = models.TextField(blank=True, null=True) # The city the school is coming from
    date = models.DateField(blank=True, null=True)  # Date of the tour
    time = models.CharField(max_length=1, choices=POSSIBLE_TIMES, null=True)  # Time of the tour
    studentCount = models.IntegerField()  # Number of students participating
    counselarName = models.TextField(blank=True, null=True)  # Name of the school counselor
    counselarPosition = models.TextField(blank=True, null=True)  # Phone number of the counselor
    counselarPhoneNumber = models.TextField(blank=True, null=True)  # Phone number of the counselor
    counselarEmail = models.EmailField(blank=True, null=True)  # Phone number of the counselor
    claimed = models.BooleanField(default=False)  # Whether the tour is claimed
    guide = models.ForeignKey(
        Guide, 
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True,
        related_name="claimed_tours"
    )  # Reference to the Guide who claimed the Tour

    def __str__(self):
        """
        String representation of the Tour object.
        """
        claimed_status = "Claimed" if self.claimed else "Unclaimed"
        return f"{self.schoolName} - {self.date} {self.time} ({claimed_status})"

    def assignGuide(self, guide):
        """
        Assign a guide to this tour, marking it as claimed.

        Args:
            guide (Guide): The guide who is claiming this tour.

        Raises:
            ValueError: If the tour is already claimed.
        """
        if self.claimed:
            raise ValueError(f"This tour has already been claimed by Guide {self.guide.username}.")

        self.guide = guide
        self.claimed = True
        self.save()

    def unassignGuide(self):
        """
        Unassign the currently assigned guide from this tour, marking it as unclaimed.

        Raises:
            ValueError: If the tour is not currently claimed.
        """
        self.guide = None
        self.claimed = False
        self.save()
