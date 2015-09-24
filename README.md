# cryptos
本工具类对crypto进行简单的封装，使之用起来更加的方便。
并新增RSA加密解密方法

#API

1.cryptos.hash(data, options)
Hash算法签名

2.cryptos.hmac(data, key, options)
常用解密

3.cryptos.cipher(data, key, options)
常用加密

4.cryptos.decipher(data, key, options)
常用解密

5.cryptos.sign(data, private_key, options)
签名

6.cryptos.verify(data, signature, public_key, options)
验证签名

7.cryptos.pem(key, options)
构造PEM编码

8.cryptos.insertStr(str, insert_str, sn)
在指定位置插入字符串

9.cryptos.RSAEncrypt(data, key_pem, options)
RSA 加密

10.cryptos.RSADecrypt(data, key_pem, options)
RSA 解密
