from django.db import models

class Test(models.Model):

    test = models.CharField(max_length=15, null=True, blank=True)
