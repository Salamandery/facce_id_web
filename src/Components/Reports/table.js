import React from 'react';

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
  pageNumber: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
    position: 'absolute',
    bottom: -30,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: 'auto', marginTop: 5, fontSize: 8 },
});

const MyDocument = ({ table, title, subtitle }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <View style={styles.headerTop}>
          <View style={styles.logo1}>
            <Image src={Logo} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>NOME DA EMPRESA</Text>
            <Text style={styles.headerAddres}>
              ENDEREÇO DO HOSPITAL, Nº, BAIRRO
            </Text>
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
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Código</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Paciente</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Data de Entrada</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Data de Saida</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                Leonardonan Costa Silva Alves Mesquita
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>01/02/2020 10:00</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>22/02/2020 08:54</Text>
            </View>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página: ${pageNumber} / ${totalPages}`}
          fixed
        />
      </View>
    </Page>
  </Document>
);

export default function ReportDefault({ table, title, subtitle }) {
  return (
    <PDFViewer style={{ width: '100%', height: '490px' }}>
      <MyDocument table={table} title={title} subtitle={subtitle} />
    </PDFViewer>
  );
}
