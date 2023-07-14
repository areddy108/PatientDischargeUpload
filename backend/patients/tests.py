from django.test import TestCase
from .models import Patient
import json 
from rest_framework import status
from django.test import TestCase, Client
from .models import Patient
from .serializers import PatientSerializer
from django.urls import reverse

client = Client()

# MODEL TESTS
class PatientTestCase(TestCase):
    """Test moduel for Patient module"""

    def setUp(self):
        Patient.objects.create(
            name="Casper", phone_number="1", physician="Yo-yo Ma"
        )

    def test_patient_exists(self):
        self.assertIsNotNone(Patient.objects.get(name="Casper"))


# API Tests

# GET by Hospital
class getPatientByHospitalTest(TestCase):

    def setUp(self):
        Patient.objects.create(
            name="john"
        )
        Patient.objects.create(
            name="eugene"
        )
        Patient.objects.create(
            name="save"
        )

    def test_get_patient_by_hospital(self):
        response = client.get('/patients/sacred_heart/'))
        #sacred heart is default, expect 3
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# POST patients
class postPatientsTest(TestCase):
    """Testing multiple Patient Post"""

    def postPatientsByPDFTest(self):
        response = client.post('/patients/', [{'name': "john"}, {'name': 'eug'}, {'name': 'sav'}], format='json')
        # I do not know how to do this testing for files
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.status, status.HTTP_201_CREATED)
    # should create another method for malformed PDF, do not have time to create PDF atm

    def postPatientsProperFormatJSON(self):
        response = client.post('/patients/', [{'name': "john"}, {'name': 'eug'}, {'name': 'sav'}], format='json')
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.status, status.HTTP_201_CREATED)

    def postPatientsIncorrectFormatJSON(self):
        response = client.post('/patients/', {"test": {'naaslkdfjls': "john", "fail": "fail"}, {'nasdfadsfme': 'eug'}, {'namefddsa': 'sav'}}, format='json')
        self.assertIsNone(response.data)
        self.assertEqual(response.status, status.HTTP_400_BAD_REQUEST )


    

    