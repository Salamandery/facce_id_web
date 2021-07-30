import React, { useCallback } from 'react';

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import Logo from './logo.png';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  headerAddres: {
    fontSize: 8,
    color: '#333',
  },
  logo1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRight: 1,
    width: '90px',
    height: '40px',
  },
  logo2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderLeft: 1,
    width: '90px',
    height: '40px',
  },
  headerInfo: {
    fontSize: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottom: {
    padding: 3,
    borderTopWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  documentSubtitle: {
    fontSize: 8,
    color: '#333',
  },
  page: {
    paddingTop: 50,
    paddingBottom: 65,
    paddingHorizontal: 45,
  },
  section: {
    paddingLeft: 10,
    marginBottom: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
    alignSelf: 'stretch',
    color: '#000',
    border: 1,
    borderColor: '#000',
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  itemsContainer: {
    alignSelf: 'stretch',
    padding: 5,
    border: 1,
    marginBottom: 15,
  },
  oficinaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    border: 1,
    backgroundColor: '#000',
  },
  oficinaInfoText: {
    paddingHorizontal: 5,
    fontSize: 10,
    fontWeight: 'extrabold',
    color: '#fff',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfoText: {
    fontSize: 9,
  },
  itemInfoTimeText: {
    fontSize: 9,
    textAlign: 'right',
  },
  pageNumber: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
    position: 'absolute',
    bottom: -30,
  },
});

const MyDocument = ({ company, text, title, subtitle, data, timeToHour }) => {
  const { UsuarioServico = [], totalInServico = [] } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <View style={styles.headerTop}>
            <View style={styles.logo1}>
              <Image src={Logo} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>{company.descricao}</Text>
              <Text style={styles.headerAddres}>{company.endereco}</Text>
            </View>
            <View style={styles.logo2}>
              <Image src={Logo} />
            </View>
          </View>
          <View style={styles.headerBottom}>
            <Text style={styles.documentTitle}>{title}</Text>
            <Text style={styles.documentSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>{text}</Text>
          {totalInServico
            ? totalInServico.map((user) => (
                <View key={`${user.usuario.id}+${user.usuario.login}`}>
                  <View style={styles.oficinaInfo}>
                    <Text style={styles.oficinaInfoText}>
                      FUNCIONÁRIO: {user.usuario.nome.toUpperCase()}
                    </Text>
                    <Text style={styles.oficinaInfoText}>
                      TOTAL: {user.total_solucao}
                    </Text>
                  </View>

                  <View style={styles.itemsContainer}>
                    <View style={styles.itemInfo}>
                      <Text
                        style={[
                          styles.itemInfoText,
                          { width: '225px', marginBottom: 2 },
                        ]}
                      >
                        SERVIÇO
                      </Text>
                      <Text style={[styles.itemInfoText, { width: '50px' }]}>
                        QTD.
                      </Text>
                      <Text
                        style={[styles.itemInfoTimeText, { width: '80px' }]}
                      >
                        TEMPO GASTO
                      </Text>
                    </View>
                    {UsuarioServico
                      ? UsuarioServico?.map((item) => {
                          if (user.usuario.id === item.usuario_id) {
                            return (
                              <View
                                key={`${item.solucao_id}'&'${item.usuario_id}`}
                                style={styles.itemInfo}
                              >
                                <Text
                                  style={[
                                    styles.itemInfoText,
                                    { width: '180px' },
                                  ]}
                                >
                                  {item.solucao.descricao}
                                </Text>
                                <Text
                                  style={[
                                    styles.itemInfoText,
                                    { width: '25px' },
                                  ]}
                                >
                                  {item.solucoes}
                                </Text>
                                <Text
                                  style={[
                                    styles.itemInfoTimeText,
                                    { width: '45px' },
                                  ]}
                                >
                                  {timeToHour(item.tempo_gasto)}
                                </Text>
                              </View>
                            );
                          }

                          return;
                        })
                      : null}
                  </View>
                </View>
              ))
            : null}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Página: ${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};

export default function ReportDefault({
  company,
  text,
  title,
  subtitle,
  data,
}) {
  const timeToHour = useCallback((time = 10) => {
    var Hours = Math.floor(time / 60);
    var minutes = time % 60;

    if (Hours >= 0 && Hours < 10) {
      Hours = '0' + Hours;
    }

    if (minutes >= 0 && minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${Hours}:${minutes}`;
  }, []);
  return (
    <PDFViewer style={{ width: '100%', height: '490px' }}>
      {data ? (
        <MyDocument
          company={company}
          text={text}
          title={title}
          subtitle={subtitle}
          data={data}
          timeToHour={timeToHour}
        />
      ) : null}
    </PDFViewer>
  );
}
