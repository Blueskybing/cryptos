var crypto_utils = require("../lib/crypto_utils.js");

var data = 'abcdef123';
var key = 'w1HRjViksi7inHXv';
var private_key = 'MIICXAIBAAKBgQCvxzcIDkILFPDtKAjk/OokjN5Ub2I30qnJNFewHnb9JP/y/+PFJ58QQINlCrkk0AmnQZrDoHWD+WO0O0ag/tyDGM3HcGpywJA59axF2IF4UO1+G5spJZbDfCKJi+n6RKyX/x4dFg1V7Wc8GcQrIIE0v0Yvn/RDT9iovLT6RrEkNwIDAQABAoGAMAKNeVnLmBNEKsJAi6q4mPsQzqcNgIm9bgMp4CSyAzpT3h8eKv9DZsD4ImTnZLKdsF0u1DfDYSSAov19sQNrXr8YkOH1aF+k0NOk/YMUxJCxWk9gGX4bDJmIMHAiS9O7N8r5A10P/5DbRgjIewgpitcEzO/AmOza0cpY1+WJCKECQQDgzQ14JWR0yB10cnKeoGaBEnvpnSVEmqNnJ0/AsVDxLdptY4UveRfBdIlquD5BUEYizJsLKLxiPv8SWglcjTh9AkEAyCxuw5tY74wm6Opn2RwrTiP2HT+7tavwpjfHjCP0AlUZz/VPrRhwRcPN6dGxBkFOteE9VUYN26QYACCsLOMhwwJAd0zbBRPzB/bbitzh70T4oS8KC6SWDp5ycV/vdzei2RuYe80A9XyyGryZ4MT+ZPMRBY7ICVgJAaqk+zxFE5TukQJBAK5FyNUxzXcYnNORKIJjvOwV8PK8Bw9+t0/vJiLDNnBFaOidmRWJPk3uz7nunuFkQEOm6n/wMqZzsZWC3INj54MCQGw2nGaYh4GJipOw+aRCLaZwQfxGTj0GDF9AtcgGBpnwkl3kCRh35tkTCL5wuVSz6Xvv3JwJGrIPl9puZPkfpNg=';
var public_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvxzcIDkILFPDtKAjk/OokjN5Ub2I30qnJNFewHnb9JP/y/+PFJ58QQINlCrkk0AmnQZrDoHWD+WO0O0ag/tyDGM3HcGpywJA59axF2IF4UO1+G5spJZbDfCKJi+n6RKyX/x4dFg1V7Wc8GcQrIIE0v0Yvn/RDT9iovLT6RrEkNwIDAQAB';
console.log('data:' + data);
console.log('key:' + key);
console.log('hash 签名：' + crypto_utils.hash(data, {
        algorithm: 'sha1',
        input_encoding: 'utf-8',
        output_encoding: 'base64'
    }));

console.log('hmac 签名：' + crypto_utils.hmac(data, key, {
        algorithm: 'sha1',
        input_encoding: 'utf-8',
        output_encoding: 'base64'
    }));

var cipher_str = crypto_utils.cipher(data, key, {
    algorithm: 'aes-128-ecb',
    input_encoding: 'utf-8',
    output_encoding: 'base64'
});
console.log('cipher 加密：' + cipher_str);

console.log(
    'decipher 解密：' + crypto_utils.decipher(cipher_str, key, {
        algorithm: 'aes-128-ecb',
        input_encoding: 'base64',
        output_encoding: 'utf-8'
    }));


private_key = crypto_utils.pem(private_key, {type: 'private_key'});
console.log('pravite key pem 编码：\n' + private_key);
var sign = crypto_utils.sign(data, private_key, {
    algorithm: 'RSA-SHA1',
    input_encoding: 'utf-8',
    output_encoding: 'base64',
});
console.log('RSA 签名：' + sign);


public_key = crypto_utils.pem(public_key, {type: 'public_key'});
console.log('public key pem 编码：\n' + public_key);
console.log('RSA 验证签名：' + crypto_utils.verify(data, sign, public_key, {
        algorithm: 'RSA-SHA1',
        output_encoding: 'base64',
    }));
