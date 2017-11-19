#!/usr/bin/python
#
# Copyright JS Foundation and other contributors, http://js.foundation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import struct
import sys
import os
from time import sleep

if sys.version_info >= (3,0):
    print("Sorry - currently only configured to work with python 2.x")
    sys.exit(1)

if len(sys.argv) > 1:
    dev = sys.argv[1].lower()
else:
    print "Bad parameters - device dir name"
    sys.exit(1)

try:
    infile_path = dev
    EVENT_SIZE = struct.calcsize('llHHI')
    file = open(infile_path, "rb")
    event = file.read(EVENT_SIZE)
    while event:
        (tv_sec, tv_usec, type, code, value) = struct.unpack('llHHI', event)
        if type == 1:
            # type,code,value
            print("%u,%u,%u,%u" % (code, value, tv_sec, tv_usec))
        event = file.read(EVENT_SIZE)
    print "0,0"
    file.close()
    sys.exit(0)
except:
    file.close()
    sys.exit(0)
