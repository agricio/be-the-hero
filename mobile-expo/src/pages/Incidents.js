import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';
import styles from './incidentsStyle';
import logoImg from '../assets/logo.png';

export default function Incidents() {
    const [ Incidents, setIncidents] = useState([]);
    const navigation = useNavigation();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigationToDetail(incident) {
        navigation.navigate('Detail',{ incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if(total > 0 && Incidents.length == total ) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        
        setIncidents([... Incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false); 
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.header}>Total of <Text style={styles.headerTextBold}>{total} cases.</Text></Text>
            </View>

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Select a this cases and save the day!</Text>

           <FlatList
              data={Incidents}
              style={styles.incidentsList}
              keyExtractor={incident => String(incident.id)}
              showsVerticalScrollIndicator={true}
              onEndReached={loadIncidents}
              onEndReachedThreshold={0.2}
              renderItem={( {item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG</Text>
                    <Text style={styles.incidenteValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Case</Text>
                    <Text style={styles.incidenteValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidenteValue}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</Text>

                <TouchableOpacity style={styles.ditailsButton} onPress={() => navigationToDetail(incident)}>
                    <Text style={styles.detailsButtonText} >See more details</Text>
                    <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity>
                </View>
              )} 
           />    
     </View>
    );
}