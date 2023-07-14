"""
Views for Project
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import tabula

from .serializers import PatientSerializer
from .models import Patient


# CONST
mappings = {"sacred_heart": Patient.HospitalChoices.SACRED_HEART}

class PatientListView(APIView):
    """
    View for getting multiple patients as list
    """
    def get(self, request, hospital):
        """
        Main method for List Class
        """
        patients = Patient.objects.filter(hospital=mappings[hospital])
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

class PatientView(APIView):
    """
        View class that defines post
        Future work can include updating patient and getting patient by name
    """
    def post(self, request):
        """
        Creating Patients through PDF File Request
        Later can define this method as it's own API
        Leaving in main API View for nwo
        """
        file_obj = request.data.get("file")
        if file_obj:
            return Response(serialize_pdf(file_obj))
        
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def serialize_pdf(file_obj):
    """
    Helper method to convert PDF tables to Patient Data
    """
    response = []
    reader = tabula.read_pdf(file_obj, pages="all")

    for df in reader:
        # we should have a model that stores differing data formats for different providers
        df.columns = ["name", "epic_id", "phone_number", "physician", "date", "primary_care", "insurance", "disposition"]
        page_json = df.to_dict(orient='records')
        serializer = PatientSerializer(data=page_json, many=True)
        if serializer.is_valid():
            serializer.save()
            response.append(serializer.data)

    return response
