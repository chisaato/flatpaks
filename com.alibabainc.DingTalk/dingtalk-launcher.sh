#!/usr/bin/sh

cd /app/extra/dingtalk/opt/apps/com.alibabainc.dingtalk/files/*Release*/
LD_LIBRARY_PATH=$(pwd):$LD_LIBRARY_PATH ./com.alibabainc.dingtalk $1
