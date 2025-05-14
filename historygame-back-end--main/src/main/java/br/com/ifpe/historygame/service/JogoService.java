package br.com.ifpe.historygame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ifpe.historygame.dto.JogoDTO;
import br.com.ifpe.historygame.entity.Jogo;
import br.com.ifpe.historygame.mapper.JogoMapper;
import br.com.ifpe.historygame.repository.JogoRepository;

@Service
public class JogoService {
    @Autowired
    private JogoRepository repository;

    @Autowired
    private JogoMapper mapper;

    public List<JogoDTO> listar() {
        return repository.findAll()
                         .stream()
                         .map(mapper::toDTO)
                         .toList();
    }

    public JogoDTO buscarPorId(Long id) {
        return repository.findById(id)
                         .map(mapper::toDTO)
                         .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));
    }

    public JogoDTO salvar(JogoDTO dto) {
        return mapper.toDTO(repository.save(mapper.toEntity(dto)));
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public JogoDTO atualizar(Long id, JogoDTO dto) {
        Jogo jogo = repository.findById(id)
                              .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));
        jogo.setNome(dto.getNome());
        jogo.setGenero(dto.getGenero());
        jogo.setCapa(dto.getCapa());
        jogo.setDataLancamento(dto.getDataLancamento());
        return mapper.toDTO(repository.save(jogo));
    }
}

