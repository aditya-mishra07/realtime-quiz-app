class WebSocketService {
  private static instance: WebSocket | null;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocket("ws://localhost:8080");
    }
    WebSocketService.instance.onopen = () => {
      console.log("WebSocket connected");
    };

    WebSocketService.instance.onclose = () => {
      console.log("WebSocket disconnected");
      WebSocketService.instance = null;
    };
    return WebSocketService.instance;
  }
}

export default WebSocketService;
