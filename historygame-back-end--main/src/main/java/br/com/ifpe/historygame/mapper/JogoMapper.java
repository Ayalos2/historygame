package br.com.ifpe.historygame.mapper;

import org.mapstruct.Mapper;

import br.com.ifpe.historygame.dto.JogoDTO;
import br.com.ifpe.historygame.entity.Jogo;

@Mapper(componentModel = "spring")
public interface JogoMapper {
    JogoDTO toDTO(Jogo jogo);
    Jogo toEntity(JogoDTO dto);
}
