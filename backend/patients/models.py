from django.db import models

# Create your models here.

class Patient(models.Model):
    """
    Model for Patient Data
    """
    class HospitalChoices(models.TextChoices):
        """
        Choices for Hospital Type
        Should be Manually Added for now
        """
        SACRED_HEART = "SH"
    
    name = models.CharField(max_length=60)
    hospital= models.CharField(choices=HospitalChoices.choices, default= HospitalChoices.SACRED_HEART, max_length=50, )
    epic_id = models.CharField(max_length=50, default="")
    phone_number = models.CharField(max_length=20, default="")
    physician = models.CharField(max_length=60, default="")
    primary_care = models.CharField(max_length=60, default="")
    date = models.CharField(max_length=20, default="")
    insurance = models.CharField(max_length=30, default="")
    disposition = models.CharField(max_length=20, default="")


'''
    //TODO
    // Defines Meta Data for Hospital and other Info that can be used when 
    // for serializer
    class Hospital(models.Model):
        hospital_fields = models.ArrayField
'''
