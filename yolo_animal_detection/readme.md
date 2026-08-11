# Detecção de Animais em Vídeos usando YOLO

## Instalação de Dependências (Sem GPU)

Caso não tenha uma GPU (ou não queira usá-la), use o arquivo `requirements_sem_gpu.txt` para instalar as dependências:

```bash
pip install -r requirements_sem_gpu.txt
```

Também é necessário instalar uma versão especial do `torch` que não usa GPU, bem como instalar `ultralytics` após a instalação do `torch`.

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install ultralytics
```

## Instalação de Dependências (Usando GPU)

As dependências podem ser instaladas usando o arquivo `requirements_gpu.txt`:

```bash
pip install -r requirements_gpu.txt
```

## Scripts

### *detection_service.py*

Este script usa *flask* para criar um serviço de detecção de animais em vídeos. Para rodar o serviço, execute o seguinte comando:

```bash
python detection_service.py
```

Algumas constantes estão definidas no início do arquivo. São elas:

- `LOCAL_SERVICE`: Se `True` o serviço estará disponível apenas para a máquina local. Se `False`, o serviço estará disponível para qualquer máquina na rede.

- `PORT`: Porta em que o serviço estará disponível.

- `FORCE_CPU`: Se `True` o serviço usará apenas a CPU para fazer a detecção. Se `False`, o serviço usará a GPU, caso esteja disponível.

- `FRAME_STRIDE`: Número de frames que serão pulados entre uma detecção e outra. Por exemplo, se `FRAME_STRIDE` for 10, o serviço fará a detecção a cada 10 frames. Neste exemplo, se o vídeo tiver 100 frames, o serviço fará a detecção em 10 frames.

- `BATCH_SIZE`: Número de frames que serão processados de uma vez. Se for usada a GPU, um número maior de frames pode ser processado de uma vez, possivelmente melhorando a performance.

- `MODEL_PATH`: Caminho para o arquivo `.pt` que contém o modelo YOLO.

O serviço aceita requisições POST no endpoint `/detect` . O caminho da máquina local para o vídeo a ser processado deve ser passado no campo `video_uri`. O serviço retorna um JSON com as detecções. Os campos do JSON são:

- `error`: `OK` se não houve erro, ou uma descrição do erro.

- `has_animal`: `True` se foi detectado um animal, `False` caso contrário.

- `width`: Largura do vídeo em pixels.

- `height`: Altura do vídeo em pixels.

- `duration`: Duração do vídeo em segundos.

- `frame_stride`: Número de frames que foram pulados entre uma detecção e outra.

- `n_frames`: Número de frames que foram avaliados.

- `total_frames` : Número total de frames do vídeo.

- `fps`: Número de frames por segundo do vídeo.

- `times`: Lista de tempos em segundos correspondentes a cada *frame* do vídeo.

- `bboxes`: retorna uma lista de listas de bounding boxes. Cada posição da lista contém uma lista de bounding boxes correspondentes a todos os animais daquele *frame*. Cada *bounding box* é um dicionário (objeto) com os campos `x0`, `y0`, `x1` e `y1`, que são as coordenadas dos pontos superior esquerdo (`x0`, `y0`) e inferior direito (`x1`, `y1`) da bounding box, respectivamente. As coordenadas estão normalizadas, ou seja, variam de 0 a 1. Para obter as coordenadas no vídeo original basta multiplicar `x0` e `x1` pela largura e `y0` e `y1` pela altura do vídeo, respectivamente.

- `confidences`: retorna uma lista de listas de confianças. Cada posição da lista contém uma lista de confianças correspondentes a todos os animais daquele *frame*. Cada confiança é um número entre 0 e 1 que corresponde ao nível de confiança do modelo de que aquela bounding box contém um animal. Somente são retornadas as confianças das bounding boxes que contém animais.

É importante notar que se o modelo avaliou *k* frames, as listas `bboxes` e `confidences` terão *k* elementos. Se em um frame não foi detectado nenhum animal, a lista de bounding boxes e confianças correspondente a esse frame será vazia.

Considere um retorno com apenas 2 frames, com o primeiro frame contendo 2 *bounding boxes*, de forma que no primeiro frame foram detectados dois animais e no segundo foi detectado um único animal. O retorno seria:

```{.json}
{
    "bboxes": [
        [
            {"x0": 0.1, "y0": 0.1, "x1": 0.2, "y1": 0.2},
            {"x0": 0.3, "y0": 0.3, "x1": 0.4, "y1": 0.4}
        ],
        [
            {"x0": 0.2, "y0": 0.2, "x1": 0.3, "y1": 0.3}
        ]
    ],
    "confidences": [
        [0.9, 0.8],
        [0.7]
    ],
    "error": "OK",
    "has_animal": true
    "n_frames": 2,
    "total_frames": 2,
    "frame_stride": 1,
    "fps": 18,
    "times": [0.0, 0.05],
    "width": 640,
    "height": 480,
    "duration": 0.05
}
```

### *test_request.py*

O *script* `test_request.py` é um exemplo de como fazer uma requisição `POST` para o serviço de detecção. O *script* faz uma requisição para o serviço com o caminho de um vídeo de exemplo e imprime as detecções em formato `.json`. O formato do `json` é o mesmo apresentado acima. Para rodar o *script*, execute o seguinte comando:

```bash
python test_request.py
```

Algumas constantes estão definidas no início do arquivo. São elas:

- `BASE_URL`: URL do serviço de detecção.

- `VIDEO_PATH`: Caminho do vídeo a ser processado (caminho local da máquina que está rodando o serviço!).
