"""
Flask приложение для проксирования запросов к OpenRouter API
"""
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from app.api.routes import api_bp

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

# Настройка CORS
CORS(app)

# Регистрация API blueprint
app.register_blueprint(api_bp, url_prefix='/api')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_spa(path):
    """Отдает index.html для всех путей кроме /api/* (SPA роутинг)"""
    if path.startswith('api/'):
        return jsonify({'error': 'Not found'}), 404
    
    # Отдаем статические файлы если они существуют
    static_path = os.path.join(app.static_folder, path) if path else None
    if path and os.path.exists(static_path) and os.path.isfile(static_path):
        return send_from_directory(app.static_folder, path)
    
    # Проверяем есть ли собранный index.html в static
    static_index = os.path.join(app.static_folder, 'index.html')
    if os.path.exists(static_index):
        return send_from_directory(app.static_folder, 'index.html')
    
    # Иначе отдаем шаблон index.html для SPA
    return send_from_directory(app.template_folder, 'index.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

