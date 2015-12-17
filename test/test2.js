/**
 * Created by bluesky on 15-10-8.
 */

var NodeRSA = require('node-rsa');
var keyData = 'MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBALSpE1MHVrk5zea0KdMpUrmvt3s+dD8wxhDTotaHM644lr5dgHWQvo3dC4hvKf+4jp1sV1NAnTWqFlD6xZPcAUrczhh/8LZTEE2OA5nFGTd1VWONZfxVteMOCCA5dzbJ0NYQqUXHxNJj7PaoOnOQmyACFcHS/LO/hLEKPMfSRbfXAgMBAAECgYADk0kHnqCPv94cT7p4LFwvwpN+A+lnCr8QvC9/0WMrcoFBOTZ+nSO4SQSeaZzKK8vev7MmuaOi2T/h0GSynWsFGLqbcDfSoZkXu1zbux+A3EmEbLXyqGkeHN+x84jz/sIr5eBhtE9qDqlndRt9iGWRu5ErhfDJOk/O5L0G4mqAsQJBAOdrgmsYfwdctqaQytPCR0OWHTxRQYVm2AvDD9tcufcz6MVgjwLdWmmJZNfx2WzcL779BTnUJFKclnGPDOnYKP8CQQDH2WAIwMH4Q87epbarOVWwMTgPek6UWZkfhQySbXq1Xjp1qk07gVn2JyXxpqAVUSulaQ1N5WsWpSbsYgLdGdkpAkEAq6/yINwame6pv2daYsIWtsiuxeoOrxa+n/NGV1syyHhlb9GUJ+7qvbNl8mOGCCJO9eWnM+D0VanAX11emjp5JwJBALMXf9IYOzsqOPaZdmtWxA1S7jQgnM6gxHHUn4GRDof921Gavf93WZEXYA+ADLFNvllLHRsTXrY6Zfkrk/ljspECQQClvLS6EQvDY6B8dyRrGm8MarcrZMwzldWTmdIaStECiRwf6LqlCV5zy7lYo3CpXnsAgxhNiNuFyEZhXYkXWwxi';



var key = new NodeRSA(keyData, 'pkcs8');
var temp = key.sign(new Buffer('123456', 'utf-8'), 'buffer', 'base64');
var sign = temp.toString('base64');
console.log(sign);
