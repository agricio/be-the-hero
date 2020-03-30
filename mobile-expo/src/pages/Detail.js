import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './DetailStyle';
import logoImg from '../assets/logo.png';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Hello ${incident.name}, I contact you becouse i would like to help in the case "${incident.title}" with the value"${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}"`;

    function navigationBack(){
        navigation.goBack();

    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero to the case: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=18564651037&text=${message}`);
    }

    return(
      <View style={styles.container}>
          <View style={styles.header}>
             <Image source={logoImg} />
               <TouchableOpacity onPress={navigationBack}>
                   <Feather name="arrow-left" size={28} color="#E02041" />
               </TouchableOpacity>
            </View>

            <FlatList
              data={[1]}
              style={styles.incidentsList}
              keyExtractor={incident => String(incident)}
              showsVerticalScrollIndicator={false}
              renderItem={() => (
                <View>
                  <View style={styles.incident}>
                      <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG</Text>
                      <Text style={styles.incidenteValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                      <Text style={styles.incidentProperty}>caso</Text>
                      <Text style={styles.incidenteValue}>{incident.case}</Text>

                       <Text style={styles.incidentProperty}>Valor:</Text>
                       <Text style={styles.incidenteValue}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</Text>
                  </View>

                  <View style={styles.contactBox}>
                      <Text style={styles.heroTitle}>Save The Day!</Text>
                      <Text style={styles.heroTitle}>He the hero this case.</Text>
                      <Text style={styles.HeroDescription}>Make Contact</Text>
           
                      <View style={styles.actions}>
                         <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                             <Text style={styles.actionText}>WhatsApp</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.action} onPress={sendMail}>
                             <Text style={styles.actionText}>E-mail</Text>
                         </TouchableOpacity>
                      </View>
                  </View> 
                </View>
               )}
            />       
       </View>
    );
}


