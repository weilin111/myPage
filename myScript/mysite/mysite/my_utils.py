import psutil


def get_cpu_and_memory_percent():
    b=psutil.cpu_percent(1)
    a=psutil.virtual_memory().percent

    return a,b









