package br.com.ifpe.historygame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ifpe.historygame.entity.Jogo;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Long> {
}

