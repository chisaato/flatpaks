#!/bin/sh
# set -x
cd $1
cat SecureCRT  | od -A n -v -t x1 | tr -d ' \n' > SecureCRTHEX.txt
mv SecureCRT SecureCRT_backup
# XForce 注册机 Bundle 模式
sed -i 's/32c799554a2483ab311bac3af12900dd55b78ca50bedfed324120f42b5/05f51f74d5081b8fa2915dc90a3300969f71cd8fb36d0f0c6fd0b54d46/g' SecureCRTHEX.txt
cat SecureCRTHEX.txt | xxd -r -p > SecureCRT

cat SecureFX  | od -A n -v -t x1 | tr -d ' \n' > SecureFXHEX.txt
mv SecureFX SecureFX_backup
# XForce 注册机 Bundle 模式
sed -i 's/32c799554a2483ab311bac3af12900dd55b78ca50bedfed324120f42b5/05f51f74d5081b8fa2915dc90a3300969f71cd8fb36d0f0c6fd0b54d46/g' SecureFXHEX.txt
cat SecureFXHEX.txt  | xxd -r -p > SecureFX

rm SecureCRTHEX.txt SecureFXHEX.txt

if [[ "$(md5sum SecureCRT_backup|cut -d\  -f1)" == "$(md5sum SecureCRT|cut -d\  -f1)" ]]; then
    echo -e "\033[1mPatch SecureCRT failed\033[0m"
    rm SecureCRT
    mv SecureCRT_backup SecureCRT
else
    echo -e "\033[1mPatch SecureCRT succceeded\033[0m"
    chmod +x SecureCRT
fi

if [[ "$(md5sum SecureFX_backup|cut -d\  -f1)" == "$(md5sum SecureFX|cut -d\  -f1)" ]]; then
    echo -e "\033[1mPatch SecureFX failed\033[0m"
    rm SecureFX
    mv SecureFX_backup SecureFX
else
    echo -e "\033[1mPatch SecureFX succceeded\033[0m"
    chmod +x SecureFX
fi
