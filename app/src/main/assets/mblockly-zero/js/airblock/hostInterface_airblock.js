// Airblock
function nativeCallWeb(methodName, jsonStr) {
    if(jsonStr) {
        var json  = JSON.parse(jsonStr);
    }
    switch(methodName) {
        case 'airblockStart':
            MBlockly.Airblock.airblockStart(json);
            break;
        case 'airblockStop':
            MBlockly.Airblock.airblockStop(json);
            break;
        case 'airblockSetWorkMode':
            MBlockly.Airblock.airblockSetWorkMode(json);
            break;
        case 'airblockGetWorkMode':
            MBlockly.Airblock.airblockGetWorkMode(json);
            break;
        case 'airblockSetControlWord':
            MBlockly.Airblock.airblockSetControlWord(json);
            break;
        case 'airblockSetForm':
            MBlockly.Airblock.airblockSetForm(json);
            break;
        case 'airblockGetForm':
            MBlockly.Airblock.airblockGetForm(json);
            break;
        case 'airblockPushControlWord':
            MBlockly.Airblock.airblockPushControlWord(json);
            break;            
        case 'airblockSetSpeed':
            MBlockly.Airblock.airblockSetSpeed(json);
            break;
        case 'airblockGetSpeed':
            MBlockly.Airblock.airblockGetSpeed(json);
            break;
        case 'airblockSetAttitude':
            MBlockly.Airblock.airblockSetAttitude(json);
            break;
        case 'airblockGetAttitude':
            MBlockly.Airblock.airblockGetAttitude(json);
            break;
        case 'airblockSetLocation':
            MBlockly.Airblock.airblockSetLocation(json);
            break;
        case 'airblockGetLocation':
            MBlockly.Airblock.airblockGetLocation(json);
            break;
        case 'airblockSetThrottle':
            MBlockly.Airblock.airblockSetThrottle(json);
            break;
        case 'airblockGetThrottle':
            MBlockly.Airblock.airblockGetThrottle(json);
            break;
        case 'airblockSetPID':
            MBlockly.Airblock.airblockSetPID(json);
            break;
        case 'airblockGetElectricity':
            MBlockly.Airblock.airblockGetElectricity(json);
            break;
        case 'airblockGetVersion':
            MBlockly.Airblock.airblockGetVersion(json);
            break;
        case 'airblockGetUuid':
            MBlockly.Airblock.airblockGetUuid(json);
            break;
        case 'airblockGetSerialNumber':
            MBlockly.Airblock.airblockGetSerialNumber(json);
            break;
        case 'airblockGetEcho':
            MBlockly.Airblock.airblockGetEcho(json);
            break;
        case 'airblockGetLedNumber':
            MBlockly.Airblock.airblockGetLedNumber(json);
            break;
        case 'airblockSetLed':
            MBlockly.Airblock.airblockSetLed(json);
            break;
        case 'airblockGetMotorNumber':
            MBlockly.Airblock.airblockGetMotorNumber(json);
            break;
        case 'airblockSetMotorThrottle':
            MBlockly.Airblock.airblockSetMotorThrottle(json);
            break;   
        case 'airblockGetUltrasonicDistance':
            MBlockly.Airblock.airblockGetMotorNumber(json);
            break;
        case 'airblockGetAirPressure':
            MBlockly.Airblock.airblockSetMotorThrottle(json);
            break;               
        default:
            break;
    }
}