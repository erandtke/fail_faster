function generateURI(qr_data) {
    var payload = {
        a: qr_data.uri_data.account,
        e: qr_data.uri_data.error_code,
        c: qr_data.uri_data.context
    };
    var uri;
    uri = "http://" + qr_data.host + ":" + qr_data.port + "/";
    uri += serializeUriData(qr_data.uri_data);
    uri = encodeURI(uri);
    console.log("uri: " + uri);
    return uri;
}

function serializeUriData(uri_data) {
    return JSON.stringify({
        a: uri_data.account,
        e: uri_data.error_code,
        c: uri_data.context
    });
}

function deserializeUriData(uri_string) {
    var parsed_uri = JSON.parse(uri_string);
    var uri_data = {};
    uri_data.account = parsed_uri.a;
    uri_data.error_code = parsed_uri.e;
    uri_data.context = parsed_uri.c;
    return uri_data;
}
