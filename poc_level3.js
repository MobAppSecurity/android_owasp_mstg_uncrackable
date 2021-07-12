Java.perform(function(){
        var a_function = Java.use("sg.vantagepoint.util.RootDetection");
        a_function.checkRoot1.implementation = function(){
                console.log("tamper function 1");
                return false;
        }

        a_function.checkRoot2.implementation = function(){
                console.log("tamper function 2"); 
                return false;
        }

        a_function.checkRoot3.implementation = function(){
                console.log("tamper function 3"); 
                console.log("tampering secret");
                attachSecret();
                return false;
        }

        Interceptor.attach(Module.findExportByName("libc.so","strstr"),{
                onEnter: function(args){

                },onLeave: function(retval){
                        retval.replace(0);
                }
        });

        function attachSecret(){
                Interceptor.attach(Module.findBaseAddress('libfoo.so').add(0x0fa0),{
                        onEnter:function(args){
                                this.secretKey = args[0];
                        },onLeave:function(retval){

                                console.log("Secret Key Generated:");
                                console.log(
                                        hexdump(this.secretKey,{
                                                offset:0,
                                                length:0x18,
                                                header:true,
                                                ansi:true
                                        })
                                );
                                var xorKey = new Uint8Array([112, 105, 122, 122, 97, 112, 105, 122, 122, 97, 112, 105, 122, 122, 97, 112, 105, 122, 122, 97, 112, 105, 122, 122])
                                var result = new Uint8Array(new ArrayBuffer(24));
                                var arrayKey = new Uint8Array(this.secretKey.readByteArray(24));

                                for(let index=0; index < xorKey.length; index++){
                                        result[index] = xorKey[index] ^ arrayKey[index];
                                }
                                console.log("Secret key: " + String.fromCharCode.apply(null,result));
                        }
                });
        }



});

