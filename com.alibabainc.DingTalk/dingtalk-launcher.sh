#!/usr/bin/sh

cd /app/extra/dingtalk-bin
LD_LIBRARY_PATH=$(pwd):$LD_LIBRARY_PATH ./com.alibabainc.dingtalk $1
