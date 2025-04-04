from flask import Flask, render_template, session, redirect, url_for, request, jsonify, render_template_string, send_file
import requests



#=============================GLOBAL USO============================

biscoito = "PHPSESSID=bijr1js6ro5rnvva2g1bh35sa5"

#===================================================================
app = Flask(__name__)

@app.route('/filas_chat')
def filaschat():
    return render_template('Monitoramento Filas Callcenter.html')


@app.route('/teste', methods=['GET'])
def chat():

    url = "https://usodigital.net/portal/pages/omni_monitor_online.php"
    headers = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Cookie": biscoito
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        result = response.text 
        return result
    else:
        return f"Error: HTTP status code {response.status_code}"
    

if __name__ == '__main__':
    # Iniciar o servidor Flask
    app.run(debug=True)
    
