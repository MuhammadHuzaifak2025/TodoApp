class ApiResponse{
    constructor(StatusCode, data, message = "Success"){
        this.StatusCode = StatusCode < 400
        this.data = data;
        this.message = message
        this.success = StatusCode
    }
}