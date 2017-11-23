# It is a node that picks up AB-Shutter3's button event. 
This is the Node-RED's node.  
AB Shutter3 is the camera shutter button of Bluetooth.  
AB Shutter3 is sold at the Daiso as of November 2017.  

![�}�P](./doc/z201.png)

## �C���X�g�[��
���ӁI�@���A�v����Raspberry Pi��p�ł��B���A�v����Node-RED�p�̒ǉ�node�ł��B

���z�[���t�H���_��/home/pi�ł���O��Ő������܂��B

1. .node-red �z���� nodes �t�H���_���쐬���܂�
2. Github����ZIP��clone�R�}���h�ȂǂŎ擾�����t�@�C���S�Ă�nodes�z���ɒu���܂�  
��j.node-red/nodes/AB-Shutter3
3. ���s�����K�v�ȃt�@�C���Ɏ��s����t���܂�  
cd .node-red/nodes/AB-Shutter3  
sudo chmod -R a+rwx keyaccess.py  

## �ݒ�

### AB-Shutter3�̃y�A�����O
1. AB-Shutter3�̓d����ON���܂�
2. Raspbian GUI��ʏ㕔�c�[���o�[��bluetooth�A�C�R����I�сA  
Add Device���_�C�A���O��AB-Shutter3�I�������x���_�C�A���O��OK���܂�  
����x�y�A�����O����ƍċN�����Ă��ݒ�͊o���Ă��܂����AAB-Shutter3��ON���邽�тɐڑ����̃_�C�A���O���o�Ă��܂�
3. AB-Shutter3�̃f�o�C�X���̊m�F���܂�  
��Node-RED�v���O���~���O���Ƀf�o�C�X��(/dev/input/event[X])���g�p���邽�ߒ��ׂĂ����܂�  

cat /proc/bus/input/devices  

![�}�T](./doc/z005.png)


## Node-RED�ł̎g����

### bluetoothbutton�m�[�h��input�s���ɗL���ȃf�o�C�X������͂���Ɠ����n�߂܂�  
![�}�P](./doc/z001.png)
inject�m�[�h����f�o�C�X��(/dev/input/event2�j�𑗂��Ă����  
![�}�Q](./doc/z003.png)

### �傫���{�^���iiOS�Ə����Ă���j�𒷉��������ꍇ  

![�}�S](./doc/z101.png)

### �������{�^���iandroid�Ə����Ă���j�𒷉��������ꍇ  

![�}�S](./doc/z102.png)

### �傫���{�^���������Ȃ��珬�����{�^���𒷉��������ꍇ  
![�}�S](./doc/z103_1.png)  
![�}�S](./doc/z103_2.png)  

## �Ō��
Node-RED core library���Q�l�ɍ쐬���Ă��܂��B
���̂��߁A���̃��C�Z���X�Ɠ��� Apache License Version 2.0 �ł��B
�����R�ɂ��g�����������B

