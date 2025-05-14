package br.com.ifpe.historygame.dto;
import java.time.LocalDate;
public class JogoDTO {
    private Long id;
    private String nome;
    private String genero;
    private String capa;
    private LocalDate dataLancamento;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getGenero() {
        return genero;
    }
    public void setGenero(String genero) {
        this.genero = genero;
    }
    public String getCapa() {
        return capa;
    }
    public void setCapa(String capa) {
        this.capa = capa;
    }
    public LocalDate getDataLancamento() {
        return dataLancamento;
    }
    public void setDataLancamento(LocalDate dataLancamento) {
        this.dataLancamento = dataLancamento;
    }

}


