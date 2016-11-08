package com.gin.blockly_demo;


        import android.bluetooth.BluetoothDevice;

public class DeviceBean {
    private static final int MIN_RSSI = -10000;
    public BluetoothDevice bluetoothDevice;
    public float distance;
    private int rssi = MIN_RSSI;
    private int rssi_pre1 = MIN_RSSI;
    private int rssi_pre2 = MIN_RSSI;
    public long updateTime = -1;

    public int getRssi() {
        return this.rssi;
    }

    public void setRssi(int rssi) {
        this.rssi_pre2 = this.rssi_pre1;
        this.rssi_pre1 = this.rssi;
        this.rssi = rssi;
    }

    public DeviceBean(BluetoothDevice device) {
        this.bluetoothDevice = device;
        this.distance = -1.0f;
        this.rssi = MIN_RSSI;
    }

    public DeviceBean(BluetoothDevice device, float distance, int rssi) {
        this.bluetoothDevice = device;
        this.distance = distance;
        this.rssi = rssi;
    }

    public boolean equals(Object o) {
        if (o instanceof DeviceBean) {
            return this.bluetoothDevice.equals(((DeviceBean) o).bluetoothDevice);
        }
        if (o instanceof BluetoothDevice) {
            return this.bluetoothDevice.equals(o);
        }
        return false;
    }

    public int getStableRssi() {
        return ((this.rssi + this.rssi_pre1) + this.rssi_pre2) / 3;
    }

    public int getMaxRssi() {
        return Math.max(Math.max(this.rssi, this.rssi_pre2), this.rssi_pre1);
    }
}
