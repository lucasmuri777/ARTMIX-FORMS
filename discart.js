document.getElementById("generate-pdf").addEventListener("click", () => {
    const form = document.getElementById("report-form");
    const formData = new FormData(form);
  
    // Criar um novo PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Adicionar o logo no cabeçalho
    const logo = new Image();
    logo.src = "./logo.png"; // Substitua pela URL do seu logo ou caminho local
  
    logo.onload = () => {
      // Adiciona o logo (posição X, Y, largura, altura)
      doc.addImage(logo, "PNG", 10, 10, 40, 20);
  
      // Adicionar título abaixo do logo
      doc.setFontSize(16);
      doc.text("Relatório de Visita", 60, 20);
  
      // Desenha uma linha horizontal para separar o cabeçalho
      doc.line(10, 35, 200, 35);
  
      // Adicionar o conteúdo do formulário
      let y = 45; // Posição inicial para o texto após o cabeçalho
      formData.forEach((value, key) => {
        if (key !== "fotos") {
          doc.setFontSize(12);
          doc.text(`${key}: ${value}`, 10, y);
          y += 10;
          if (y > 270) {
            doc.addPage(); // Adiciona uma nova página se o texto ultrapassar o limite
            y = 10;
          }
        }
      });
  
      // Adicionar imagens ao PDF
      const files = formData.getAll("fotos");
      if (files.length > 0) {
        doc.addPage();
        let imgX = 10; // Posição inicial para as imagens no eixo X
        let imgY = y + 10; // Posição inicial no eixo Y após o texto
        let column = 0; // Contador para alternar colunas
        let processedFiles = 0;
  
        files.forEach((file) => {
          const reader = new FileReader();
  
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
  
            img.onload = () => {
              // Adiciona a imagem (50x50 é o tamanho)
              doc.addImage(img, "JPEG", imgX, imgY, 50, 50);
  
              // Mover para a próxima coluna
              imgX += 60;
              column++;
  
              if (column === 3) {
                // Se atingir 3 colunas, move para a próxima linha
                imgX = 10;
                imgY += 60;
                column = 0;
              }
  
              // Adicionar nova página se ultrapassar o limite
              if (imgY + 50 > 280) {
                imgY = 10;
                imgX = 10;
                column = 0;
              }
  
              // Verifica se todas as imagens foram processadas
              processedFiles++;
              if (processedFiles === files.length) {
                doc.save("relatorio.pdf"); // Salvar o PDF após processar todas as imagens
              }
            };
          };
  
          reader.readAsDataURL(file);
        });
      } else {
        // Salvar diretamente se não houver imagens
        doc.save("relatorio.pdf");
      }
    };
  
    // Caso o logo não carregue
    logo.onerror = () => {
      console.warn("Logo não encontrada ou falha ao carregar. Gerando PDF sem o logo.");
  
      // Adicionar título abaixo do logo ausente
      doc.setFontSize(16);
      doc.text("Relatório de Visita", 60, 20);
  
      // Desenha uma linha horizontal para separar o cabeçalho
      doc.line(10, 35, 200, 35);
  
      // Adicionar o conteúdo do formulário
      let y = 45; // Posição inicial para o texto após o cabeçalho
      formData.forEach((value, key) => {
        if (key !== "fotos") {
          doc.setFontSize(12);
          doc.text(`${key}: ${value}`, 10, y);
          y += 10;
          if (y > 270) {
            doc.addPage(); // Adiciona uma nova página se o texto ultrapassar o limite
            y = 10;
          }
        }
      });
  
      // Adicionar imagens ao PDF
      const files = formData.getAll("fotos");
      if (files.length > 0) {
        doc.addPage();
        let imgX = 10; // Posição inicial para as imagens no eixo X
        let imgY = y + 10; // Posição inicial no eixo Y após o texto
        let column = 0; // Contador para alternar colunas
        let processedFiles = 0;
  
        files.forEach((file) => {
          const reader = new FileReader();
  
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
  
            img.onload = () => {
              // Adiciona a imagem (50x50 é o tamanho)
              doc.addImage(img, "JPEG", imgX, imgY, 50, 50);
  
              // Mover para a próxima coluna
              imgX += 60;
              column++;
  
              if (column === 3) {
                // Se atingir 3 colunas, move para a próxima linha
                imgX = 10;
                imgY += 60;
                column = 0;
              }
  
              // Adicionar nova página se ultrapassar o limite
              if (imgY + 50 > 280) {
                imgY = 10;
                imgX = 10;
                column = 0;
              }
  
              // Verifica se todas as imagens foram processadas
              processedFiles++;
              if (processedFiles === files.length) {
                doc.save("relatorio.pdf"); // Salvar o PDF após processar todas as imagens
              }
            };
          };
  
          reader.readAsDataURL(file);
        });
      } else {
        // Salvar diretamente se não houver imagens
        doc.save("relatorio.pdf");
      }
    };
  });
  