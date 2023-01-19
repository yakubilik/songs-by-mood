import React from 'react'
import { View, Text } from 'react-native'
import { useState } from 'react';
export default function Photo() {
    const [write, setWrite] = useState(null);
    const permisionFunction = async () => {
    const writePermission = await PermissionsAndroid.request(android.permission.WRITE_EXTERNAL_STORAGE,
        {
            title: "Galeri yazma isteği"
        }
    );
     setWrite(writePermission)
    if (write.status !== "granted" )
     {
        alert("Permission for media access needed.");
      }
};
    write.status !== "granted"

    return (
        <View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        </View>
    )
}
