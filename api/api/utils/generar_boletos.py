from io import StringIO, BytesIO
from wkhtmltopdf.views import PDFTemplateResponse

from django.core.files import File
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.test.client import RequestFactory
from django.http import HttpResponse
from django.conf import settings

LETRAS = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

def pdf_boletos(compra):
    file = generar_boletos(compra)
    compra.tickets = File(file)
    compra.save()

def generar_boletos(compra):
    template = 'pdf/boletos.html'

    index = 0;
    fils = -1
    cols = 0
    boletos = []
    for item in compra.boletos.all():
        if cols == 4:
            cols= 0
        if cols == 0:
            boletos.append([])
            fils += 1
        array = boletos[fils]
        array.append({'fila': LETRAS[item.butaca.fila], 'asiento': item.butaca.numero_asiento})
        boletos[fils] = array
        cols += 1

    for item in boletos:
        cols = len(item)
        if cols < 4:
            for i in range(0, 4-cols):
                item.append(None)


    print('boletos ', boletos)
    
    context = {
        'boletos': boletos
    }
    
    cmd_options = {
        'page-size': 'A4',
        'margin-top': 5,      # 25 mm
        'margin-right': 5,    # 30 mm
        'margin-left': 5,     # 30 mm
        'margin-bottom': 5,   # 25 mm
        'encoding': "UTF-8",
        'no-outline': None,
        # 'javascript-delay': 5000,
    }
    
    request = RequestFactory().get('/')
    nombre = f"boletos.pdf"
    
    
    # RETORNA LA VISTA PDF
    response = PDFTemplateResponse(
        request=request,
        template=template,
        filename=nombre,
        context=context,
        show_content_in_browser=False,
        cmd_options=cmd_options
    )
    _buffer = response.rendered_content
    _bytesio = BytesIO(_buffer)
    _memory_file = InMemoryUploadedFile(_bytesio, None, nombre, 'application/pdf', _bytesio.tell(), None)
    return _memory_file