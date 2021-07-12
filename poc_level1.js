Java.perform(function(){
        var a_function = Java.use("sg.vantagepoint.a.c");
        a_function.a.implementation = function(){
                console.log("tamper function a");
                return false;
        }

        a_function.b.implementation = function(){
                console.log("tamper function b"); 
                return false;
        }

        a_function.c.implementation = function(){
                console.log("tamper function c"); 
                return false;
        }
        var plain_text_string = Java.use("java.lang.String");
        var enc_function = Java.use("sg.vantagepoint.a.a");

        enc_function.a.implementation = function(byte0,byte1){
                var plain_text_bin = this.a(byte0,byte1);
                console.log("plain text:" + plain_text_string.$new(plain_text_bin));
                return plain_text_bin;
        }

});

