package com.gin.blockly_demo;


import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

public class BluetoothAdapter_2 extends UnifiedBluetoothAdapter {
    protected static final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private static final String TAG = BluetoothAdapter_2.class.getSimpleName();
    private BroadcastReceiver blueBroadcastReceiver;
    private ConnectThread connectThread;
    private boolean hasConnected;
    private final BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    private InputStream mmInStream;
    private OutputStream mmOutStream;
    private ParseReceivedDataThread parseReceivedDataThread;
    private BluetoothSocket socket;

    private class ConnectThread extends Thread {
        private DeviceBean bluetoothDevice;
        private Boolean isRunning = Boolean.valueOf(false);
        private int retryTime = 0;

        public ConnectThread(DeviceBean bluetoothDevice) {
            this.bluetoothDevice = bluetoothDevice;
        }

        public void run() {
            Log.e(BluetoothAdapter_2.TAG, "connectThread start run");
            this.isRunning = Boolean.valueOf(true);
            this.retryTime++;
            if (!connect().booleanValue()) {
                this.retryTime++;
                connect();
                this.retryTime = 0;
            }
            this.isRunning = Boolean.valueOf(false);
        }

        private Boolean connect() {
            if (this.bluetoothDevice.bluetoothDevice.getBondState() != 12) {
                try {
                    Log.e(BluetoothAdapter_2.TAG, "此设备没有配对  开始配对");
                    //UnifiedBluetoothManager.getInstance().needGotoSystemBluetooth();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                return Boolean.valueOf(false);
            }
            try {
                BluetoothAdapter_2.this.socket = this.bluetoothDevice.bluetoothDevice.createRfcommSocketToServiceRecord(BluetoothAdapter_2.MY_UUID);
                BluetoothAdapter_2.this.socket.connect();
                Log.e(BluetoothAdapter_2.TAG, "socket连接成功");
                try {
                    Log.e(BluetoothAdapter_2.TAG, "开始初始化:mmInStream,mmOutStream");
                    BluetoothAdapter_2.this.mmInStream = BluetoothAdapter_2.this.socket.getInputStream();
                    BluetoothAdapter_2.this.mmOutStream = BluetoothAdapter_2.this.socket.getOutputStream();
                    Log.e(BluetoothAdapter_2.TAG, "初始化:mmInStream,mmOutStream 成功");
                    if (BluetoothAdapter_2.this.parseReceivedDataThread == null) {
                        Log.e(BluetoothAdapter_2.TAG, "开启 parseReceivedDataThread");
                        BluetoothAdapter_2.this.parseReceivedDataThread = new ParseReceivedDataThread();
                        BluetoothAdapter_2.this.parseReceivedDataThread.isRunning = Boolean.valueOf(true);
                        BluetoothAdapter_2.this.parseReceivedDataThread.start();
                    }
                    BluetoothAdapter_2.this.mConnectionState = 2;
                    BluetoothAdapter_2.this.hasConnected = true;
                    if (BluetoothAdapter_2.this.listener != null) {
                        BluetoothAdapter_2.this.listener.onConnectedDevice(this.bluetoothDevice);
                    }
                    return Boolean.valueOf(true);
                } catch (Exception e2) {
                    BluetoothAdapter_2.this.mConnectionState = 0;
                    if (BluetoothAdapter_2.this.listener != null) {
                        BluetoothAdapter_2.this.listener.onSearchEvent(5);
                    }
                    return Boolean.valueOf(false);
                }
            } catch (Exception e3) {
                BluetoothAdapter_2.this.mConnectionState = 0;
                if (BluetoothAdapter_2.this.listener != null) {
                    BluetoothAdapter_2.this.listener.onSearchEvent(5);
                }
                return Boolean.valueOf(false);
            }
        }
    }

    private class ParseReceivedDataThread extends Thread {
        public Boolean isRunning;

        private ParseReceivedDataThread() {
            this.isRunning = Boolean.valueOf(false);
        }

        public void run() {
            byte[] buffer = new byte[1024];
            while (this.isRunning.booleanValue()) {
                if (BluetoothAdapter_2.this.mmInStream != null) {
                    try {
                        BluetoothAdapter_2.this.checkReceiveData(buffer, BluetoothAdapter_2.this.mmInStream.read(buffer));
                    } catch (Exception e) {
                        Log.e(BluetoothAdapter_2.TAG, "disconnected");
                        this.isRunning = Boolean.valueOf(false);
                        BluetoothAdapter_2.this.mRx.clear();
                        BluetoothAdapter_2.this.update4BluetoothDisconnected();
                        return;
                    }
                }
            }
        }
    }

    public BluetoothAdapter_2() {
        registerReceiver();
    }

    public boolean isSupport() {
        return this.mBluetoothAdapter != null;
    }

    public boolean isEnable() {
        if (isSupport()) {
            return this.mBluetoothAdapter.isEnabled();
        }
        return false;
    }

    public void startDiscovery() {
        if (isEnable()) {
            int retryTimes = 0;
            while (!this.mBluetoothAdapter.startDiscovery()) {
                this.mBluetoothAdapter.cancelDiscovery();
                if (retryTimes > 3) {
                    transmitSearchEvent(-1);
                    return;
                }
                retryTimes++;
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            return;
        }
        transmitSearchEvent(8);
    }

    /*public void startProgram(OnProgressChangeListener listener) {
        throw new RuntimeException("蓝牙2.0不支持升级固件");
    }*/

    public void stopDiscovery() {
        this.mBluetoothAdapter.cancelDiscovery();
    }

    public void connect(DeviceBean bluetoothDevice) {
        if (BluetoothAdapter.getDefaultAdapter().isDiscovering()) {
            BluetoothAdapter.getDefaultAdapter().cancelDiscovery();
        }
        if (this.connectThread == null || !this.connectThread.isRunning.booleanValue()) {
            this.mConnectionState = 1;
            this.connectThread = new ConnectThread(bluetoothDevice);
            this.connectThread.start();
            transmitSearchEvent(3);
            return;
        }
        Log.e(TAG, "connectThread 正在运行中");
    }

    public void disconnect() {
        this.mConnectionState = 0;
        if (this.socket == null) {
            Log.e(TAG, "socket已经断开");
            update4BluetoothDisconnected();
            return;
        }
        try {
            this.mmOutStream.close();
            this.mmInStream.close();
            this.socket.close();
            this.mmOutStream = null;
            this.mmInStream = null;
            this.socket = null;
            update4BluetoothDisconnected();
            Log.e(TAG, "断开蓝牙连接成功");
        } catch (Exception e) {
            Log.e(TAG, "断开蓝牙连接异常");
            e.printStackTrace();
        }
    }

    public void stopProgram() {
        throw new RuntimeException("蓝牙2.0不支持升级固件");
    }

    public boolean isDiscovering() {
        return this.mBluetoothAdapter.isDiscovering();
    }

    public void write(byte[] bytes) {
        if (this.mmOutStream == null) {
            Log.e(TAG, "mmOutStream==null 蓝牙未连接 return");
            return;
        }
        try {
            this.mmOutStream.write(bytes);
            this.mmOutStream.flush();
        } catch (Exception e) {
            Log.e(TAG, "write(byte[] bytes) 异常 蓝牙断开");
            update4BluetoothDisconnected();
            e.printStackTrace();
        }
    }

    private void update4BluetoothDisconnected() {
        if (this.parseReceivedDataThread != null) {
            Log.e(TAG, "关闭 parseReceivedDataThread");
            try {
                this.parseReceivedDataThread.isRunning = Boolean.valueOf(false);
                this.parseReceivedDataThread.interrupt();
                this.parseReceivedDataThread = null;
            } catch (Exception e) {
                Log.e(TAG, "关闭parseReceivedDataThread时Exception：" + e.getLocalizedMessage());
            }
        }
        if (this.hasConnected) {
            this.hasConnected = false;
            transmitSearchEvent(7);
            if (this.listener != null) {
                this.listener.onDisconnectDevice();
            }
        } else if (this.listener != null) {
            this.listener.onSearchEvent(5);
        }
    }

    public void registerReceiver() {
        if (this.blueBroadcastReceiver == null) {
            this.blueBroadcastReceiver = new BroadcastReceiver() {
                public void onReceive(Context context, Intent intent) {
                    String action = intent.getAction();
                    int i = -1;
                    switch (action.hashCode()) {
                        case -1780914469:
                            if (action.equals("android.bluetooth.adapter.action.DISCOVERY_FINISHED")) {
                                i = 1;
                                break;
                            }
                            break;
                        case 6759640:
                            if (action.equals("android.bluetooth.adapter.action.DISCOVERY_STARTED")) {
                                i = 0;
                                break;
                            }
                            break;
                        case 1167529923:
                            if (action.equals("android.bluetooth.device.action.FOUND")) {
                                i = 3;
                                break;
                            }
                            break;
                        case 1821585647:
                            if (action.equals("android.bluetooth.device.action.ACL_DISCONNECTED")) {
                                i = 4;
                                break;
                            }
                            break;
                        case 2116862345:
                            if (action.equals("android.bluetooth.device.action.BOND_STATE_CHANGED")) {
                                i = 2;
                                break;
                            }
                            break;
                    }
                    BluetoothDevice device;
                    switch (i) {
                        case 0:
                            BluetoothAdapter_2.this.transmitSearchEvent(0);
                            return;
                        case 1:
                            BluetoothAdapter_2.this.transmitSearchEvent(1);
                            return;
                        case 2:
                            device = (BluetoothDevice) intent.getParcelableExtra("android.bluetooth.device.extra.DEVICE");
                            switch (device.getBondState()) {
                                case 10:
                                    BluetoothAdapter_2.this.transmitSearchEvent(11);
                                    return;
                                case 11:
                                    BluetoothAdapter_2.this.transmitSearchEvent(9);
                                    return;
                                case 12:
                                    BluetoothAdapter_2.this.transmitSearchEvent(10);
                                    //BluetoothAdapter_2.this.connect(UnifiedBluetoothManager.getInstance().getDevice(device.getAddress()));
                                    return;
                                default:
                                    return;
                            }
                        case 3:
                            device = (BluetoothDevice) intent.getParcelableExtra("android.bluetooth.device.extra.DEVICE");
                            if (BluetoothAdapter_2.this.isOurDevice(device) && BluetoothAdapter_2.this.listener != null) {
                                BluetoothAdapter_2.this.listener.onFoundDevice(new DeviceBean(device));
                                return;
                            }
                            return;
                        default:
                            return;
                    }
                }
            };
            IntentFilter filter = new IntentFilter();
            filter.addAction("android.bluetooth.device.action.FOUND");
            filter.addAction("android.bluetooth.adapter.action.DISCOVERY_STARTED");
            filter.addAction("android.bluetooth.adapter.action.DISCOVERY_FINISHED");
            filter.addAction("android.bluetooth.adapter.action.CONNECTION_STATE_CHANGED");
            filter.addAction("android.bluetooth.device.action.ACL_DISCONNECTED");
            filter.addAction("android.bluetooth.device.action.BOND_STATE_CHANGED");
            filter.addAction("android.bluetooth.adapter.action.SCAN_MODE_CHANGED");
            filter.addAction("android.bluetooth.adapter.action.STATE_CHANGED");
            //App.getContext().registerReceiver(this.blueBroadcastReceiver, filter);
            Log.e(TAG, "registerReceiver");
        }
    }

    public void unregisterReceiver() {
        Log.e(TAG, "unregisterReceiver");
        if (this.blueBroadcastReceiver != null) {
            //App.getContext().unregisterReceiver(this.blueBroadcastReceiver);
            //UnifiedBluetoothManager.getInstance().disconnectBluetooth();
        }
    }

    protected boolean isOurDevice(BluetoothDevice device) {
        boolean isOurDevice = super.isOurDevice(device);
        if (isOurDevice && device.getName().contains("Makeblock_LE")) {
            return false;
        }
        return isOurDevice;
    }
}
