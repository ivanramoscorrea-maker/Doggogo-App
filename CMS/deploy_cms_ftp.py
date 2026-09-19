import ftplib
import os
import sys

FTP_SERVER = "ftp.revista.lat"
FTP_PORT = 21
FTP_USER = "ivanramos@cms.doggogo.site"
FTP_PASS = "Lallave2026."
LOCAL_DIR = "dist"
REMOTE_DIR = "/"  # Asumimos la raíz del subdominio en FTP

def clear_directory(ftp, path):
    try:
        ftp.cwd(path)
        print(f"Limpiando directorio remoto: {path}")
        files = []
        ftp.dir(files.append)
        for f in files:
            parts = f.split()
            if len(parts) >= 9:
                name = " ".join(parts[8:])
                if name in [".", ".."]: continue
                # Si es directorio, fallará al borrar como archivo y lo intentamos recursivo
                try:
                    ftp.delete(name)
                except:
                    clear_directory(ftp, name)
                    ftp.cwd("..")
                    ftp.rmd(name)
        ftp.cwd("/")
    except Exception as e:
        print(f"Nota (no crítico): No se pudo limpiar {path}: {e}")

def upload_directory(ftp, local_path, remote_path):
    print(f"Subiendo {local_path} a {remote_path}...")
    try:
        ftp.mkd(remote_path)
    except ftplib.error_perm:
        pass # El directorio ya existe

    ftp.cwd(remote_path)
    
    for item in os.listdir(local_path):
        local_item = os.path.join(local_path, item)
        if os.path.isfile(local_item):
            print(f"Subiendo archivo: {item}")
            with open(local_item, 'rb') as file:
                ftp.storbinary(f'STOR {item}', file)
        elif os.path.isdir(local_item):
            upload_directory(ftp, local_item, f"{remote_path}/{item}")
            ftp.cwd(remote_path)

def main():
    if not os.path.exists(LOCAL_DIR):
        print(f"ERROR: La carpeta '{LOCAL_DIR}' no existe. Ejecuta 'npm run build' primero.")
        sys.exit(1)

    print(f"Conectando a {FTP_SERVER}...")
    try:
        ftp = ftplib.FTP()
        ftp.connect(FTP_SERVER, FTP_PORT)
        ftp.login(FTP_USER, FTP_PASS)
        print("Conexión FTP exitosa.")
        
        clear_directory(ftp, REMOTE_DIR)
        upload_directory(ftp, LOCAL_DIR, REMOTE_DIR)
        
        ftp.quit()
        print("¡Despliegue del CMS completado con éxito!")
    except Exception as e:
        print(f"Error de conexión FTP: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
