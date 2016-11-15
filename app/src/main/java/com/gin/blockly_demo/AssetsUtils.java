package com.gin.blockly_demo;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by zhuoying on 2016/11/14.
 */

public class AssetsUtils {
    private static final int hexFileDataContentIndex = 9;
    private static final int hexFileDataLengthIndex = 1;

    public static Bitmap getImageFromAssetsFile(Context context, String fileName) {
        Bitmap image = null;
        try {
            InputStream is = context.getResources().getAssets().open(fileName);
            image = BitmapFactory.decodeStream(is);
            is.close();
            return image;
        } catch (IOException e) {
            e.printStackTrace();
            return image;
        }
    }

    public static byte[] getFirmwareFromAssetsFile(Context context, String fileName) {
        byte[] buffer = new byte[1000000];
        int index = 0;
        try {
            InputStream inputStream = context.getResources().getAssets().open(fileName);
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
            BufferedReader bufferedInputStream = new BufferedReader(inputStreamReader);
            byte[] lineBuffer = new byte[20];
            for (String lineData = bufferedInputStream.readLine(); lineData != null; lineData = bufferedInputStream.readLine()) {
                char[] charData = lineData.toCharArray();
                int lineBufferIndex = 0;
                byte dataLength = duoHexToByte(charData[1], charData[2]);
                for (char i = '\u0000'; i < dataLength; i = (char) (i + 1)) {
                    lineBuffer[lineBufferIndex] = duoHexToByte(charData[(i * 2) + 9], charData[((i * 2) + 9) + 1]);
                    lineBufferIndex++;
                }
                if (lineBufferIndex > 0) {
                    System.arraycopy(lineBuffer, 0, buffer, index, lineBufferIndex);
                    index += lineBufferIndex;
                }
            }
            bufferedInputStream.close();
            inputStreamReader.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] data = new byte[index];
        System.arraycopy(buffer, 0, data, 0, index);
        return data;
    }

    private static byte duoHexToByte(char hex1, char hex2) {
        return (byte) ((hexToByte(hex1) << 4) | hexToByte(hex2));
    }

    private static byte hexToByte(char hex) {
        if (hex > '9') {
            return (byte) ((hex - 65) + 10);
        }
        return (byte) (hex - 48);
    }

}
