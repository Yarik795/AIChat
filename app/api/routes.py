"""
API endpoints для работы с OpenRouter
"""
import os
import requests
from flask import Blueprint, request, jsonify

api_bp = Blueprint('api', __name__)

# URL OpenRouter API
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"


@api_bp.route('/chat', methods=['POST'])
def chat():
    """
    Проксирует запрос к OpenRouter API
    
    Принимает:
    {
        "message": "текст сообщения",
        "model": "openai/gpt-4"
    }
    
    Возвращает:
    {
        "content": "ответ от модели",
        "model": "использованная модель"
    }
    """
    try:
        # Получаем данные из запроса
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Отсутствуют данные в запросе'}), 400
        
        message = data.get('message')
        model = data.get('model')
        
        # Валидация
        if not message or not isinstance(message, str):
            return jsonify({'error': 'Поле "message" обязательно и должно быть строкой'}), 400
        
        if not model or not isinstance(model, str):
            return jsonify({'error': 'Поле "model" обязательно и должно быть строкой'}), 400
        
        # Получаем API ключ из переменных окружения
        api_key = os.environ.get('OPENROUTER_API_KEY')
        if not api_key:
            return jsonify({'error': 'API ключ не настроен'}), 500
        
        # Получаем HTTP Referer (опционально)
        http_referer = os.environ.get('HTTP_REFERER', request.headers.get('Origin', ''))
        
        # Подготавливаем запрос к OpenRouter
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        if http_referer:
            headers['HTTP-Referer'] = http_referer
        
        payload = {
            'model': model,
            'messages': [
                {
                    'role': 'user',
                    'content': message
                }
            ]
        }
        
        # Отправляем запрос к OpenRouter
        response = requests.post(
            OPENROUTER_API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )
        
        # Обработка ответа
        if response.status_code == 200:
            response_data = response.json()
            
            # Извлекаем содержимое ответа
            if 'choices' in response_data and len(response_data['choices']) > 0:
                content = response_data['choices'][0]['message']['content']
                used_model = response_data.get('model', model)
                
                return jsonify({
                    'content': content,
                    'model': used_model
                }), 200
            else:
                return jsonify({'error': 'Неожиданный формат ответа от OpenRouter'}), 500
        
        # Обработка ошибок от OpenRouter
        error_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
        error_message = error_data.get('error', {}).get('message', 'Ошибка при запросе к OpenRouter')
        
        return jsonify({
            'error': error_message,
            'status_code': response.status_code
        }), response.status_code
    
    except requests.exceptions.Timeout:
        return jsonify({'error': 'Таймаут при запросе к OpenRouter'}), 504
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Ошибка сети: {str(e)}'}), 500
    
    except Exception as e:
        return jsonify({'error': f'Внутренняя ошибка сервера: {str(e)}'}), 500

