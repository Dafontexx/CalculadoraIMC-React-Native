// ==================================================
// CALCULADORA DE IMC — Versão Premium com Ícones
// Bibliotecas usadas: @expo/vector-icons + react-native-paper
// ==================================================

// Importação dos recursos
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';

// Componentes estilizados do react-native-paper
import {
  Text,
  TextInput,
  Button,
  Card,
  Divider,
  useTheme,
} from 'react-native-paper';

// Ícones — escolhemos ícones intuitivos para cada parte
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// Componente principal
export default function App() {
  // ===== ESTADOS =====
  // Armazenam os valores digitados e resultados
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [corResultado, setCorResultado] = useState('#4B5563'); // Cor padrão cinza

  // ===== FUNÇÃO DE CÁLCULO =====
  const calcularIMC = () => {
    // Validação: campos não podem estar vazios
    if (!peso.trim() || !altura.trim()) {
      Alert.alert(
        '⚠️ Campos vazios',
        'Por favor, digite seu peso e sua altura!'
      );
      return;
    }

    // Converter para números
    const pesoNum = parseFloat(peso.replace(',', '.'));
    let alturaNum = parseFloat(altura.replace(',', '.'));

    // Validação: devem ser números positivos
    if (
      isNaN(pesoNum) ||
      isNaN(alturaNum) ||
      pesoNum <= 0 ||
      alturaNum <= 0
    ) {
      Alert.alert('❌ Valor inválido', 'Digite números positivos válidos!');
      return;
    }

    // Converter altura de cm para metros se necessário
    if (alturaNum > 3) {
      alturaNum = alturaNum / 100;
    }

    // Fórmula do IMC
    const resultado = pesoNum / (alturaNum * alturaNum);
    setImc(resultado.toFixed(2));

    // Classificação + cor correspondente
    if (resultado < 18.5) {
      setClassificacao('Abaixo do peso');
      setCorResultado('#F59E0B'); // Amarelo
    } else if (resultado < 25) {
      setClassificacao('Peso Normal 🎉');
      setCorResultado('#10B981'); // Verde
    } else if (resultado < 30) {
      setClassificacao('Sobrepeso');
      setCorResultado('#F59E0B'); // Amarelo
    } else if (resultado < 35) {
      setClassificacao('Obesidade Grau I');
      setCorResultado('#F97316'); // Laranja
    } else if (resultado < 40) {
      setClassificacao('Obesidade Grau II');
      setCorResultado('#EF4444'); // Vermelho
    } else {
      setClassificacao('Obesidade Grau III');
      setCorResultado('#B91C1C'); // Vermelho escuro
    }
  };

  // ===== FUNÇÃO DE LIMPEZA =====
  const limparTudo = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCorResultado('#4B5563');
  };

  // ===== INTERFACE =====
  return (
    <View style={styles.tela}>
      {/* Conteúdo rolável — se a tela for pequena */}
      <ScrollView contentContainerStyle={styles.conteudo}>
        
        {/* ===== CABEÇALHO ===== */}
        <View style={styles.cabecalho}>
          <MaterialCommunityIcons name="scale-bathroom" size={50} color="#3B82CE" />
          <Text variant="headlineMedium" style={styles.titulo}>
            Calculadora de IMC
          </Text>
          <Text variant="bodyMedium" style={styles.subtitulo}>
            Descubra seu índice de massa corporal
          </Text>
        </View>

        {/* ===== CARD DE ENTRADA DE DADOS ===== */}
        <Card style={styles.card}>
          <Card.Content>
            {/* Campo PESO */}
            <View style={styles.campoContainer}>
              <View style={styles.iconeRotulo}>
                <FontAwesome5 name="weight-hanging" size={22} color="#3B82CE" />
                <Text variant="titleMedium" style={styles.rotulo}> Peso (kg)</Text>
              </View>
              <TextInput
                placeholder="Ex: 72,5"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
                style={styles.entrada}
                mode="outlined"
                outlineColor="#CBD5E1"
                activeOutlineColor="#3B82CE"
                left={<TextInput.Icon icon="numeric" />}
              />
            </View>

            <Divider style={styles.divisor} />

            {/* Campo ALTURA */}
            <View style={styles.campoContainer}>
              <View style={styles.iconeRotulo}>
                <MaterialCommunityIcons name="human-male-height" size={24} color="#3B82CE" />
                <Text variant="titleMedium" style={styles.rotulo}> Altura (m ou cm)</Text>
              </View>
              <TextInput
                placeholder="Ex: 1,68 ou 168"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
                style={styles.entrada}
                mode="outlined"
                outlineColor="#CBD5E1"
                activeOutlineColor="#3B82CE"
                left={<TextInput.Icon icon="ruler" />}
              />
            </View>
          </Card.Content>
        </Card>

        {/* ===== BOTÕES ===== */}
        <View style={styles.botoesLinha}>
          <Button
            mode="contained"
            onPress={calcularIMC}
            style={styles.botaoCalcular}
            icon={() => <Ionicons name="calculator" size={18} color="#FFF" />}
            contentStyle={{ paddingVertical: 6 }}
          >
            Calcular
          </Button>

          <Button
            mode="outlined"
            onPress={limparTudo}
            style={styles.botaoLimpar}
            icon={() => <Ionicons name="refresh" size={18} color="#EF4444" />}
            contentStyle={{ paddingVertical: 6 }}
          >
            Limpar
          </Button>
        </View>

        {/* ===== RESULTADO — SÓ APARECE SE HOUVER CÁLCULO ===== */}
        {imc !== null && (
          <Card style={styles.cardResultado}>
            <Card.Content style={styles.conteudoResultado}>
              <Ionicons name="heart-circle" size={40} color={corResultado} />
              
              <Text variant="titleMedium" style={styles.textoSeuImc}>
                Seu IMC é
              </Text>
              
              <Text style={[styles.valorImc, { color: corResultado }]}>
                {imc}
              </Text>
              
              <Text style={[styles.textoClassificacao, { color: corResultado }]}>
                {classificacao}
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* ===== TABELA DE REFERÊNCIA ===== */}
        <Card style={styles.cardTabela}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.tabelaTitulo}>
              📊 Tabela de Referência
            </Text>
            <Divider style={{ marginVertical: 8 }} />
            
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• Menor que 18,5</Text>
              <Text style={{ color: '#F59E0B' }}>Abaixo do peso</Text>
            </View>
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• 18,5 a 24,9</Text>
              <Text style={{ color: '#10B981' }}>Peso normal ✅</Text>
            </View>
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• 25,0 a 29,9</Text>
              <Text style={{ color: '#F59E0B' }}>Sobrepeso</Text>
            </View>
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• 30,0 a 34,9</Text>
              <Text style={{ color: '#F97316' }}>Obesidade Grau I</Text>
            </View>
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• 35,0 a 39,9</Text>
              <Text style={{ color: '#EF4444' }}>Obesidade Grau II</Text>
            </View>
            <View style={styles.linhaTabela}>
              <Text style={styles.faixa}>• ≥ 40,0</Text>
              <Text style={{ color: '#B91C1C' }}>Obesidade Grau III</Text>
            </View>
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
}

// ===== ESTILOS =====
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Fundo azul bem claro
  },
  conteudo: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
  },
  subtitulo: {
    color: '#64748B',
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    elevation: 3, // Sombra Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    marginBottom: 20,
  },
  campoContainer: {
    marginVertical: 8,
  },
  iconeRotulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rotulo: {
    fontWeight: '600',
    color: '#334155',
  },
  entrada: {
    backgroundColor: '#FAFBFC',
  },
  divisor: {
    marginVertical: 12,
  },
  botoesLinha: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  botaoCalcular: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#3B82CE',
  },
  botaoLimpar: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#EF4444',
  },
  cardResultado: {
    borderRadius: 16,
    marginBottom: 24,
    elevation: 3,
  },
  conteudoResultado: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  textoSeuImc: {
    color: '#475569',
    marginTop: 12,
  },
  valorImc: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  textoClassificacao: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardTabela: {
    borderRadius: 16,
    elevation: 2,
  },
  tabelaTitulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1E293B',
  },
  linhaTabela: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  faixa: {
    fontSize: 14,
    color: '#475569',
  },
});
