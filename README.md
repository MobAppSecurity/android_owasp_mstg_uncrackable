This frida script can be run in x86 Android emulator, originally I used Genymotion as the emulator and at the time of writing I used frida with version 14.2.13

To run the script you can use this command:
  ~# frida -U -l "frida script" -f owasp.mstg.uncrackable<1-3>
  
Go check the full implementation on: https://mobappsecurity.github.io/blog/android_application_security/2021/07/09/android_application_security_chapter_0x2.html
