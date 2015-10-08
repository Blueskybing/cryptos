/**
 * Created by bluesky on 15-9-23.
 * Description：加密解密工具类.
 */

"use strict";

var crypto = require('crypto');
var NodeRSA = require('node-rsa');
var cryptojs = require('cryptojs').Crypto;

var cryptos = module.exports = {};

/**
 * Hash算法
 * var crypto = require('crypto');  # 加载crypto库
 * console.log(crypto.getHashes()); # 打印支持的hash算法
 * @param data
 * @param options {input_encoding：输入文本编码，默认'utf-8'
 * output_encoding：输出文本编码（'hex'、'binary'或者'base64'）,默认'base64'}
 * @returns {*}
 */
cryptos.hash = function (data, options) {
    options = options || {};
    var hash = crypto.createHash(options.algorithm || 'sha1');
    hash.update(data, options.input_encoding || 'utf-8');
    return hash.digest(options.output_encoding || 'base64');
}

/**
 * hmac算法
 * var crypto = require('crypto');  # 加载crypto库
 * console.log(crypto.getHashes()); # 打印支持的hash算法
 * @param data
 * @param key
 * @param options {input_encoding：输入文本编码，默认'utf-8'
 * output_encoding：输出文本编码（'hex'、'binary'或者'base64'）,默认'base64'}
 * @returns {*}
 */
cryptos.hmac = function (data, key, options) {
    options = options || {};
    var hmac = crypto.createHmac(options.algorithm || 'sha1', key);
    hmac.update(data, 'utf8');
    return hmac.digest(options.output_encoding || 'base64');
}

/**
 * 常用加密
 * @param data default 'utf-8'
 * @param key
 * @param options {algorithm default "aes-128-ecb"(you can use 'console.log(crypto.getCiphers())')}
 * @returns {string}
 */
cryptos.cipher = function (data, key, options) {
    options = options || {};
    var algorithm = options.algorithm || "aes-128-ecb";
    var input_encoding = options.input_encoding || "utf8";
    var output_encoding = options.output_encoding || "base64";
    var iv = options.iv || "";
    var auto_padding = options.auto_padding || true;

    var cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAutoPadding(auto_padding);
    var cipher_chunks = [];
    cipher_chunks.push(cipher.update(data, input_encoding, output_encoding));
    cipher_chunks.push(cipher.final(output_encoding));
    var cipher_str = cipher_chunks.join('');
    //资源清理
    cipher_chunks.length = 0;
    cipher_chunks = undefined;
    return cipher_str;
}

/**
 * 常用解密
 * @param data default 'base64'
 * @param key
 * @param options {algorithm default "aes-128-ecb"(you can use 'console.log(crypto.getCiphers())')}
 * @returns {string}
 */
cryptos.decipher = function (data, key, options) {
    options = options || {};
    var algorithm = options.algorithm || "aes-128-ecb";
    var input_encoding = options.input_encoding || "base64";
    var output_encoding = options.output_encoding || "utf8";
    var iv = options.iv || "";
    var auto_padding = options.auto_padding || true;

    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(auto_padding);
    var decipher_chunks = [];
    decipher_chunks.push(decipher.update(data, input_encoding, output_encoding));
    decipher_chunks.push(decipher.final(output_encoding));
    var decipher_text = decipher_chunks.join('');
    //资源清理
    decipher_chunks.length = 0;
    decipher_chunks = undefined;
    return decipher_text;
}

/**
 * 签名
 * @param data
 * @param private_key 是一个包含了签名私钥的字符串，而该私钥是用PEM编码的。
 * @param options {algorithm:根据给定的算法，创建并返回一个signing对象。在最近的OpenSSL发布版本中，
 * openssl list-public-key-algorithms会列出可用的签名算法，例如'RSA-SHA1',默认'RSA-SHA1'
 * input_encoding:输入字符串编码，默认'utf-8';
 * output_encoding：输出签名编码,默认'base64'.}
 */
cryptos.sign = function (data, private_key, options) {
    options = options || {};
    var sign = crypto.createSign(options.algorithm || "RSA-SHA1");
    sign.update(new Buffer(data, options.input_encoding || 'utf-8'));
    return sign.sign(private_key, options.output_encoding || 'base64');
}

/**
 * 验证签名
 * @param data 签名源串,默认'utf-8';
 * @param signature 签名,默认 'base64';
 * @param public_key 是一个公钥的字符串，而该私钥是用PEM编码的。
 * @param options {algorithm:根据给定的算法，创建并返回一个signing对象。在最近的OpenSSL发布版本中，
 * openssl list-public-key-algorithms会列出可用的签名算法，例如'RSA-SHA1',默认'RSA-SHA1'
 * input_encoding:输入字符串编码，默认'base64'.}
 */
cryptos.verify = function (data, signature, public_key, options) {
    options = options || {};
    var verifier = crypto.createVerify(options.algorithm || "RSA-SHA1");
    verifier.update(new Buffer(data, 'utf-8'));
    return verifier.verify(public_key, signature, options.input_encoding || 'base64');
}
/**
 * 构造PEM编码
 * @param key
 * @param options {type:公钥传'public_key'，私钥传'private_key'.}
 * @returns {string}
 */
cryptos.pem = function (key, options) {
    options = options || {};
    var config = {
        public_key: {
            start: '-----BEGIN PUBLIC KEY-----\n',
            end: '-----END PUBLIC KEY-----'
        },
        private_key: {
            start: '-----BEGIN RSA PRIVATE KEY-----\n',
            end: '-----END RSA PRIVATE KEY-----'
        }
    }
    // 构造PEM编码
    var pem_key = cryptos.insertStr(key, '\n', 64);
    return config[options.type].start
        + pem_key
        + config[options.type].end;
}

/**
 * 在指定位置插入字符串
 * @param str 源字符串
 * @param insert_str 要插入的字符或串
 * @param sn 每隔多少个字符插入
 * @returns {string}
 */
cryptos.insertStr = function (str, insert_str, sn) {
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insert_str;
    }
    return newstr;
}

/**
 * RSA 加密
 * @param data
 * @param key_pem  private key or public key,key from PEM string
 * @param options  {encryption_scheme padding scheme for encrypt/decrypt. Can be 'pkcs1_oaep' or 'pkcs1'.Default 'pkcs1'.
 * output_encoding:输出密文编码}
 * @returns base64
 * @constructor
 */
cryptos.RSAEncrypt = function (data, key_pem, options) {
    options = options || {};
    var encryption_scheme = options.encryption_scheme || 'pkcs1';
    var key = new NodeRSA(key_pem, {encryptionScheme: encryption_scheme});
    var temp = key.encrypt(new Buffer(data, 'utf-8'), 'buffer', 'base64');
    return temp.toString(options.output_encoding || 'base64');
}

/**
 * RSA 解密
 * @param data base64
 * @param key_pem private key or public key,key from PEM string
 * @param param encryption_scheme padding scheme for encrypt/decrypt. Can be 'pkcs1_oaep' or 'pkcs1'.Default 'pkcs1'.
 * @returns {string}
 * @constructor
 */
cryptos.RSADecrypt = function (data, key_pem, options) {
    options = options || {};
    var encryption_scheme = options.encryption_scheme || 'pkcs1';
    var key = new NodeRSA(key_pem, {encryptionScheme: encryption_scheme});
    return key.decrypt(data).toString();
}

/**
 * Rabbit 加密
 */
cryptos.RabbitEncrypt = cryptojs.Rabbit.encrypt;

/**
 * Rabbit 解密
 */
cryptos.RabbitDecrypt = cryptojs.Rabbit.decrypt;
/**
 * RC4 加密
 */
cryptos.MARC4Encrypt = cryptojs.MARC4.encrypt;

/**
 * RC4 解密
 */
cryptos.MARC4Decrypt = cryptojs.MARC4.decrypt;
