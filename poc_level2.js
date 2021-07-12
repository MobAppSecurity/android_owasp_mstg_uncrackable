Java.perform(function(){
        var a_function = Java.use("sg.vantagepoint.a.b");
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
                findAddressStrncmp();
                return false;
        }

        function findAddressStrncmp(){
                Process.enumerateModules({
                        onMatch:function(module){
                                if(module.name == "libfoo.so"){
                                        console.log("Module Name: " + module.name + "-" + module.base.toString());
                                        Interceptor.attach(module.base.add(0x000005f0),{
                                                onEnter: function(args){
                                                        var str1 = args[0].readUtf8String(23);
                                                        var str2 = args[1].readUtf8String(23);
                                                        console.log("Our Input:" + str1);
                                                        console.log("Expected Input:" + str2);
                                                },onLeave: function(retval){
                                                        retval.replace(0);
                                                }
                                        });
                                }
                        },onComplete:function(){

                        }
               }); 

        }

});

