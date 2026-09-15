## ADDED Requirements

### Requirement: Mapa do site lista todos os idiomas

O mapa do site SHALL conter uma entrada por versão de idioma, cada uma com suas
alternativas `hreflang`.

#### Scenario: Leitura do mapa do site

- **WHEN** o mapa do site é lido
- **THEN** contém as entradas da raiz e de `/en/`, cada uma referenciando a outra
