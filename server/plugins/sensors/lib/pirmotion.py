try:
    import RPi.GPIO as GPIO
    import json
except ImportError:
    raise ImportError('import RPi.GPIO as GPIO failed because server is not launched on a RaspberryPi')

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

Pin = 27
GPIO.setup(Pin, GPIO.IN)
i = GPIO.input(Pin)
print json.dumps({'presence':i})
