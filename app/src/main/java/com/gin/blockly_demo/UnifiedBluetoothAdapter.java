package com.gin.blockly_demo;


import android.bluetooth.BluetoothDevice;
import android.text.TextUtils;

import java.util.ArrayList;
import java.util.List;

public abstract class UnifiedBluetoothAdapter {
    protected StateChangeListener listener;
    protected int mConnectionState = 0;
    protected volatile List<Byte> mRx = new ArrayList();

    public interface StateChangeListener {
        void onConnectedDevice(DeviceBean deviceBean);

        void onDisconnectDevice();

        void onFoundDevice(DeviceBean deviceBean);

        void onReceiveData(byte[] bArr);

        void onSearchEvent(int i);
    }

    public abstract void connect(DeviceBean deviceBean);

    public abstract void disconnect();

    public abstract boolean isDiscovering();

    public abstract boolean isEnable();

    public abstract boolean isSupport();

    public abstract void startDiscovery();

    //public abstract void startProgram(OnProgressChangeListener onProgressChangeListener);

    public abstract void stopDiscovery();

    public abstract void stopProgram();

    public abstract void write(byte[] bArr);

    public void setConnectedStateListener(StateChangeListener listener) {
        this.listener = listener;
    }

    protected void transmitSearchEvent(int type) {
        if (this.listener != null) {
            this.listener.onSearchEvent(type);
        }
    }

    protected boolean isOurDevice(BluetoothDevice device) {
        if (TextUtils.isEmpty(device.getName())) {
            return false;
        }
        if (device.getName().contains("Makeblock") || device.getName().contains("makeblock")) {
            return true;
        }
        return false;
    }

    public int getConnectionState() {
        return this.mConnectionState;
    }

    protected synchronized void checkReceiveData(byte[] buffer, int bytesCount) {
        if (bytesCount > 0) {
            for (int i = 0; i < bytesCount; i++) {
                byte c = buffer[i];
                this.mRx.add(Byte.valueOf(c));
                if (c == (byte) 10 && this.mRx.size() > 3 && ((Byte) this.mRx.get(this.mRx.size() - 2)).byteValue() == 13) {
                    int len4Msg = this.mRx.size();
                    byte[] msg = new byte[len4Msg];
                    int j = 0;
                    while (j < len4Msg) {
                        try {
                            msg[j] = (byte) (((Byte) this.mRx.get(j)).byteValue() & 255);
                            j++;
                        } catch (Exception e) {
                            this.mRx.clear();
                        }
                    }
                    if (len4Msg < 4) {
                        this.mRx.clear();
                        break;
                    }
                    if (len4Msg == 4) {
                        if ((msg[0] & 255) == 255 && (msg[1] & 255) == 85 && (msg[2] & 255) == 13 && (msg[3] & 255) == 10) {
                            this.mRx.clear();
                            break;
                        }
                    }
                    if ((msg[0] & 255) != 255 || (msg[1] & 255) != 85 || (msg[len4Msg - 2] & 255) != 13 || (msg[len4Msg - 1] & 255) != 10) {
                        this.mRx.clear();
                        break;
                    }
                    this.mRx.clear();
                    if (this.listener != null) {
                        this.listener.onReceiveData(msg);
                    }
                }
            }
        }
        return;
    }
}
