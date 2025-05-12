package com.Momentum.Momentum.usuario;

public class UsuarioConEventosDto {
    private UsuarioDto usuario;
    private long eventosCompletados;

    public UsuarioConEventosDto(UsuarioDto usuario, long eventosCompletados) {
        this.usuario = usuario;
        this.eventosCompletados = eventosCompletados;
    }

    public UsuarioDto getUsuario() {
        return usuario;
    }

    public long getEventosCompletados() {
        return eventosCompletados;
    }

    public void setUsuario(UsuarioDto usuario) {
        this.usuario = usuario;
    }

    public void setEventosCompletados(long eventosCompletados) {
        this.eventosCompletados = eventosCompletados;
    }
}
